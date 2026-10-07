import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * 短地址：/tvbox/s -> TVBOX 订阅配置（给电视客户端用的接口地址）
 *
 * 为什么配置写在代码里、而不是去请求 /api/tvbox/subscribe：
 *   1) TVBOX/FongMi 的网络库关闭了跟随重定向（catvod OkHttp: followRedirects(false)），
 *      所以这里必须直接返回内容，不能 302；
 *   2) 之前用 fetch 请求本站另一个接口，在 Cloudflare Workers 上等于自己调自己，
 *      实测直接 522 超时；
 *   3) 直连各资源站 api（不套 cms-proxy）也更稳：CF 出口去拉国内 CDN 的清单本来就不稳。
 *
 * 改了资源站列表，记得同步这里。
 */

const SITES = [
  { key: 'lzi', name: '量子资源', type: 1, api: 'https://cj.lziapi.com/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
  { key: 'ffzy', name: '非凡资源', type: 1, api: 'http://cj.ffzyapi.com/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
  { key: 'bfzy', name: '暴风资源', type: 1, api: 'https://bfzyapi.com/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
  { key: 'suoni', name: '索尼资源', type: 1, api: 'https://suoniapi.com/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
  { key: 'sdzy', name: '闪电资源', type: 1, api: 'https://sdzyapi.com/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
  { key: 'mdzy', name: '魔都资源', type: 1, api: 'https://www.mdzyapi.com/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
  { key: 'zuid', name: '最大资源', type: 1, api: 'https://api.zuidapi.com/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
  { key: 'niuniu', name: '牛牛资源', type: 1, api: 'https://api.niuniuzy.me/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
  { key: 'jinying', name: '金鹰资源', type: 1, api: 'https://www.jinyingzy.net/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
  { key: 'wujin', name: '无尽资源', type: 1, api: 'https://api.wujinapi.me/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
  { key: 'jisu', name: '极速资源', type: 1, api: 'https://jszyapi.com/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
  { key: 'hnzy', name: '红牛资源', type: 1, api: 'https://www.hongniuzy2.com/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
  { key: 'zy360', name: '360资源', type: 1, api: 'https://360zy.com/api.php/provide/vod/', searchable: 1, quickSearch: 1, filterable: 1 },
];

export async function GET() {
  return NextResponse.json(
    { sites: SITES },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
