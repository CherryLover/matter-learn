#!/usr/bin/env python3
"""
全站 SEO 体检：扫描构建产物 dist/，逐页检查搜索引擎关心的基础项。

用法：npm run build && python3 scripts/seo-audit.py

每个可收录页面（没有 noindex、canonical 指向自己）检查：
- <title> 存在、全站唯一、不超过 70 个字符
- meta description 存在；超过 160 个字符只提醒
- 恰好一个 <h1>；没有 meta refresh
- canonical、hreflang（zh / en / x-default）齐全，且指向真实存在的页面
- og:title / og:image / twitter:card / JSON-LD 齐全
- 站内链接和 #锚点都能落到真实页面和元素上（命中 _redirects 的只提醒）
- <img> 都有 alt，图片文件存在
- sitemap 收录了全部可收录页面，且不含不存在的页面

退出码：有错误为 1，只有提醒为 0。
"""
import sys
import xml.etree.ElementTree as ET
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse

SITE = 'https://matter-learn.flyooo.uk'
DIST = Path('dist')
TITLE_MAX = 70
DESC_MAX = 160
SKIP_SCHEMES = ('mailto:', 'tel:', 'javascript:', 'data:')


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = None
        self.meta = {}
        self.alternates = {}
        self.canonical = None
        self.h1 = 0
        self.ids = set()
        self.hrefs = []
        self.imgs = []
        self.ld_json = 0
        self.refresh = False
        self._in_head = False
        self._in_title = False
        self._buf = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'):
            self.ids.add(a['id'])
        if tag == 'head':
            self._in_head = True
        elif tag == 'title' and self._in_head and self.title is None:
            self._in_title = True
        elif tag == 'meta':
            key = a.get('name') or a.get('property')
            if key:
                self.meta[key] = a.get('content') or ''
            if (a.get('http-equiv') or '').lower() == 'refresh':
                self.refresh = True
        elif tag == 'link':
            rel = (a.get('rel') or '').lower()
            if rel == 'canonical':
                self.canonical = a.get('href')
            elif rel == 'alternate' and a.get('hreflang'):
                self.alternates[a['hreflang']] = a.get('href')
        elif tag == 'h1':
            self.h1 += 1
        elif tag == 'a':
            if a.get('name'):
                self.ids.add(a['name'])
            if a.get('href') is not None:
                self.hrefs.append(a['href'])
        elif tag == 'img':
            self.imgs.append((a.get('src') or '', a.get('alt')))
        elif tag == 'script' and a.get('type') == 'application/ld+json':
            self.ld_json += 1

    def handle_endtag(self, tag):
        if tag == 'head':
            self._in_head = False
        elif tag == 'title' and self._in_title:
            self._in_title = False
            self.title = ''.join(self._buf).strip()

    def handle_data(self, data):
        if self._in_title:
            self._buf.append(data)


def url_of(path):
    rel = path.relative_to(DIST).as_posix()
    return '/' + (rel[: -len('index.html')] if rel.endswith('index.html') else rel)


def resolve(url_path):
    p = unquote(url_path).lstrip('/')
    if not p or p.endswith('/'):
        cands = [DIST / p / 'index.html']
    else:
        cands = [DIST / p, DIST / (p + '.html'), DIST / p / 'index.html']
    return next((c for c in cands if c.is_file()), None)


def load_redirects():
    f = DIST / '_redirects'
    if not f.is_file():
        return set()
    return {ln.split()[0] for ln in f.read_text().splitlines() if ln.strip() and not ln.startswith('#')}


def sitemap_urls():
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    index = DIST / 'sitemap-index.xml'
    if not index.is_file():
        return None
    urls = set()
    for loc in ET.parse(index).getroot().findall('s:sitemap/s:loc', ns):
        part = DIST / urlparse((loc.text or '').strip()).path.lstrip('/')
        urls |= {(u.text or '').strip() for u in ET.parse(part).getroot().findall('s:url/s:loc', ns)}
    return urls


def main():
    if not DIST.is_dir():
        sys.exit('找不到 dist/，先运行 npm run build')

    pages = {}
    for f in sorted(DIST.rglob('*.html')):
        p = Page()
        p.feed(f.read_text(encoding='utf-8'))
        pages[url_of(f)] = (f, p)

    redirects = load_redirects()
    errors, warnings = [], defaultdict(list)
    host = urlparse(SITE).netloc
    indexable, titles = [], defaultdict(list)

    for url, (f, p) in pages.items():
        noindex = 'noindex' in p.meta.get('robots', '').lower()
        is_canonical = p.canonical == SITE + url
        if not noindex and is_canonical:
            indexable.append(url)
            if not p.title:
                errors.append(f'[缺标题] {url}')
            else:
                titles[p.title].append(url)
                if len(p.title) > TITLE_MAX:
                    errors.append(f'[标题过长] {url}：{len(p.title)} 字符「{p.title}」')
            desc = p.meta.get('description', '').strip()
            if not desc:
                errors.append(f'[缺描述] {url}')
            elif len(desc) > DESC_MAX:
                warnings['描述超过 160 字符（搜索结果里会被截断）'].append(f'{url}（{len(desc)}）')
            if p.h1 != 1:
                errors.append(f'[h1 数量] {url}：{p.h1} 个')
            for key in ('og:title', 'og:image', 'twitter:card'):
                if not p.meta.get(key):
                    errors.append(f'[缺 {key}] {url}')
            if not p.ld_json:
                errors.append(f'[缺结构化数据] {url}')
            if url.startswith(('/zh/', '/en/')):
                for lang in ('zh', 'en', 'x-default'):
                    alt = p.alternates.get(lang)
                    if not alt:
                        errors.append(f'[缺 hreflang={lang}] {url}')
                    elif urlparse(alt).netloc != host or not resolve(urlparse(alt).path):
                        errors.append(f'[hreflang 指向不存在的页面] {url} → {alt}')
        elif not noindex and not p.canonical:
            errors.append(f'[缺 canonical] {url}')
        if p.refresh:
            errors.append(f'[meta refresh] {url}')

        base = SITE + url
        for href in p.hrefs:
            if not href or href.startswith(SKIP_SCHEMES):
                continue
            target = urlparse(urljoin(base, href))
            if target.netloc != host:
                continue
            if target.path in redirects:
                warnings['链接指向会被 301 跳转的旧地址'].append(f'{url} → {href}')
                continue
            dest = resolve(target.path)
            if dest is None:
                errors.append(f'[断链] {url} → {href}')
                continue
            frag = unquote(target.fragment)
            if frag and frag not in pages[url_of(dest)][1].ids:
                errors.append(f'[锚点不存在] {url} → {href}')

        for src, alt in p.imgs:
            if alt is None:
                errors.append(f'[图片缺 alt] {url}：{src}')
            src_url = urlparse(urljoin(base, src))
            if src_url.netloc == host and not (DIST / unquote(src_url.path).lstrip('/')).is_file():
                errors.append(f'[图片不存在] {url}：{src}')

    for title, urls in titles.items():
        if len(urls) > 1:
            errors.append(f'[标题重复] 「{title}」：{", ".join(urls)}')

    listed = sitemap_urls()
    if listed is None:
        errors.append('[缺 sitemap] dist/sitemap-index.xml 不存在')
    else:
        expected = {SITE + u for u in indexable}
        for u in sorted(expected - listed):
            errors.append(f'[sitemap 漏收] {u}')
        for u in sorted(listed - expected):
            if not resolve(urlparse(u).path):
                errors.append(f'[sitemap 指向不存在的页面] {u}')

    longest = max(((len(pages[u][1].title or ''), u) for u in indexable), default=(0, '-'))
    print(f'页面 {len(pages)} 个，可收录 {len(indexable)} 个；最长标题 {longest[0]} 字符（{longest[1]}）')
    if errors:
        print(f'\n错误 {len(errors)} 条：')
        for e in errors:
            print('  ' + e)
    for kind, items in warnings.items():
        print(f'\n提醒：{kind}，共 {len(items)} 处，例如：')
        for it in items[:8]:
            print('  ' + it)
    print('\n结论：' + ('有错误，需要修复' if errors else '没有错误'))
    sys.exit(1 if errors else 0)


if __name__ == '__main__':
    main()
