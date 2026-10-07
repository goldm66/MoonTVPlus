import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * 短地址：/tvbox/s -> TVBOX 订阅内容（自动开去广告）。
 *
 * 注意：TVBOX/FongMi 客户端的网络库显式关闭了跟随重定向
 * （catvod OkHttp: followRedirects(false)），所以这里**必须直接返回订阅内容**，
 * 不能返回 302 —— 否则客户端会报「配置取得失败」。
 */
export async function GET(request: NextRequest) {
  const token = process.env.TVBOX_SUBSCRIBE_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'TVBOX 订阅未启用' }, { status: 403 });
  }

  const url = new URL('/api/tvbox/subscribe', request.url);
  url.searchParams.set('token', token);
  url.searchParams.set('adFilter', 'true');

  const resp = await fetch(url.toString());
  const body = await resp.text();

  return new NextResponse(body, {
    status: resp.status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
