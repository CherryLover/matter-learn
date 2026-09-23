#!/usr/bin/env python3
"""
核对 Cluster 手册页里的属性 / 命令编号是否与官方定义一致。

对照数据：src/data/matter-spec.json（由 scripts/gen-matter-spec.py 生成）
检查范围：表格行里的「ID + 名称」、<h3 id="attr-/cmd-"> 标题、正文里的 <code>Name (0xNN)</code>

用法：python3 scripts/audit-cluster-ids.py [zh|en]

注意：结构体字段表、事件字段表、Feature 位表也会被扫到，名字对不上官方属性/命令时会误报，
需要人工判断；另外一些属性在新版本中已被移除（如 Mode 类 Cluster 的 StartUpMode / OnMode），
报告为 official: [] 的条目多半属于这种情况。
页面里用 <span class="removed-tag"> 标注过的已移除条目会被跳过。
"""
import json,re,glob,sys
d=json.load(open('src/data/matter-spec.json'));C={x['id']:x for x in d['clusters']};G=d['globalAttributes']
idx=open('src/i18n/zh/pages/cluster-index.ts').read()
slug2id={m.group(2):'0x'+m.group(1)[2:].upper().zfill(4) for m in re.finditer(r"id: '(0x[0-9A-Fa-f]+)'.*?href: '/clusters/([^/]*)/'",idx)}
norm=lambda x: re.sub(r'[^a-z0-9]','',x.lower())
lang=sys.argv[1] if len(sys.argv)>1 else 'zh'
out={}
for f in sorted(glob.glob(f'src/i18n/{lang}/clusters/*.ts')):
  s=open(f).read()
  parts=re.split(r"\n  '([a-z0-9-]+)': \{",s)
  for i in range(1,len(parts),2):
    slug=parts[i];body=parts[i+1];c=C[slug2id[slug]]
    cmds={**c['responses'],**c['commands']}
    names=set(map(norm,list(c['attributes'].values())+list(cmds.values())+list(G.values())+list(c['events'].values())))
    # table rows: <td><a href="#x"><code>0xNN</code></a></td>\n <td>Name</td>  or <td><code>0xNN</code></td><td>Name
    for m in re.finditer(r'<td>(?:<a [^>]*>)?<code>(0x[0-9A-Fa-f]+)</code>(?:</a>)?</td>\s*<td>([A-Za-z][A-Za-z0-9]*)',body):
      n=int(m.group(1),16);nm=m.group(2)
      # 已标注「新版已移除」的行（<span class="removed-tag">）是有意保留的旧版条目，跳过
      if 'removed-tag' in body[m.end():body.find('</td>',m.end())]: continue
      cands=[c['attributes'].get('0x%04X'%n),G.get('0x%04X'%n),c['commands'].get('0x%02X'%n) if n<256 else None,c['responses'].get('0x%02X'%n) if n<256 else None,c['events'].get('0x%02X'%n) if n<256 else None]
      if not any(x and norm(x)==norm(nm) for x in cands):
        out.setdefault(slug,[]).append(f"{m.group(1)} {nm} -> official: {[x for x in cands if x]}")
    # prose "Name (0xNN)" or "Name（0xNN）"
    for m in re.finditer(r'<code>([A-Z][A-Za-z0-9]+) ?[（(](0x[0-9A-Fa-f]+)[)）]</code>',body):
      nm,n=m.group(1),int(m.group(2),16)
      cands=[c['attributes'].get('0x%04X'%n),G.get('0x%04X'%n),c['commands'].get('0x%02X'%n) if n<256 else None,c['responses'].get('0x%02X'%n) if n<256 else None]
      if norm(nm) in names and not any(x and norm(x)==norm(nm) for x in cands):
        out.setdefault(slug,[]).append(f"prose {nm} ({m.group(2)}) -> official: {[x for x in cands if x]}")
tot=0
for k,v in out.items():
  tot+=len(v);print(k,len(v))
  for x in v: print('   ',x)
print('TOTAL',tot)
