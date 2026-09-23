#!/usr/bin/env python3
"""
从 connectedhomeip 官方 ZAP XML 生成站点使用的 Matter ID 数据表。

用法：
  git clone --depth 1 --branch v1.6.0.0 --filter=blob:none --sparse \
      https://github.com/project-chip/connectedhomeip chip
  (cd chip && git sparse-checkout set src/app/zap-templates/zcl/data-model/chip)
  python3 scripts/gen-matter-spec.py chip/src/app/zap-templates/zcl/data-model/chip v1.6.0.0

输出：src/data/matter-spec.json
"""
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

SKIP_FILES = {
    'test-cluster.xml',
    'fault-injection-cluster.xml',
    'sample-mei-cluster.xml',
    'test-hidden-manufacturer-specific-cluster.xml',
}


def hex_id(value: str, width: int) -> str:
    n = int(value, 0)
    return f'0x{n:0{width}X}'


def text_name(el) -> str:
    """属性/命令名：新格式放在 name 属性里，旧格式放在元素文本或 <description> 里。"""
    if el.get('name'):
        return el.get('name').strip()
    desc = el.find('description')
    if desc is not None and desc.text:
        return desc.text.strip()
    return (el.text or '').strip()


def parse_cluster(el):
    maturity = el.get('apiMaturity', 'stable')
    if maturity == 'internal':
        return None
    code = el.findtext('code')
    if code is None:
        return None
    cid = int(code, 0)
    if cid > 0x7FFF:  # 跳过测试用厂商自定义 Cluster
        return None

    attributes = {}
    for a in el.findall('attribute'):
        if a.get('side', 'server') != 'server' or a.get('apiMaturity') == 'internal':
            continue
        attributes[hex_id(a.get('code'), 4)] = text_name(a)

    commands = {}
    for c in el.findall('command'):
        if c.get('apiMaturity') == 'internal':
            continue
        entry = {'name': c.get('name', '').strip()}
        if c.get('source') == 'server':
            entry['response'] = True
        # 请求和响应可能共用同一个 ID（例如 DoorLock 0x0C），分两张表存放
        table = 'r' if entry.get('response') else 'c'
        commands.setdefault(table, {})[hex_id(c.get('code'), 2)] = entry['name']

    events = {}
    for e in el.findall('event'):
        if e.get('apiMaturity') == 'internal':
            continue
        events[hex_id(e.get('code'), 2)] = e.get('name', text_name(e))

    features = []
    feats = el.find('features')
    if feats is not None:
        for f in feats.findall('feature'):
            features.append({
                'bit': int(f.get('bit')),
                'code': f.get('code'),
                'name': f.get('name'),
            })
        features.sort(key=lambda f: f['bit'])

    return {
        'id': hex_id(code, 4),
        'name': el.findtext('name').strip(),
        'maturity': maturity,
        'attributes': attributes,
        'commands': commands.get('c', {}),
        'responses': commands.get('r', {}),
        'events': events,
        'features': features,
    }


def parse_device_types(path: Path):
    root = ET.parse(path).getroot()
    result = []
    for dt in root.iter('deviceType'):
        did = dt.findtext('deviceId')
        if did is None:
            continue
        n = int(did, 0)
        if n > 0xBFFF:  # 跳过测试/孤儿设备类型
            continue
        result.append({
            'id': hex_id(did, 4),
            'name': (dt.findtext('typeName') or '').strip(),
            'class': (dt.findtext('class') or '').strip(),
            'revision': int(dt.findtext('revision') or 0),
        })
    result.sort(key=lambda d: int(d['id'], 16))
    return result


def main():
    xml_dir = Path(sys.argv[1])
    version = sys.argv[2] if len(sys.argv) > 2 else 'unknown'

    clusters = {}
    for f in sorted(xml_dir.glob('*.xml')):
        if f.name in SKIP_FILES:
            continue
        try:
            root = ET.parse(f).getroot()
        except ET.ParseError:
            continue
        for el in root.iter('cluster'):
            c = parse_cluster(el)
            if c:
                clusters[c['id']] = c

    global_attrs = {}
    root = ET.parse(xml_dir / 'global-attributes.xml').getroot()
    for a in root.iter('attribute'):
        global_attrs[hex_id(a.get('code') or '0', 4)] = text_name(a)

    device_types = parse_device_types(xml_dir / 'matter-devices.xml')

    out = {
        'source': f'connectedhomeip {version}',
        'globalAttributes': global_attrs,
        'clusters': sorted(clusters.values(), key=lambda c: int(c['id'], 16)),
        'deviceTypes': device_types,
    }
    dest = Path(__file__).resolve().parent.parent / 'src/data/matter-spec.json'
    dest.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')) + '\n')
    print(f"clusters={len(out['clusters'])} deviceTypes={len(device_types)} -> {dest}")


if __name__ == '__main__':
    main()
