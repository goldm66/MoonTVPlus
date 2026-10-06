import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * 短地址：/tvbox/s -> 带 token 的 TVBOX 订阅（自动开去广告）。
 * 放在 /tvbox/ 前缀下，因为该前缀在 middleware 里已豁免登录。
 */
export async function GET(request: NextRequest) {
  const token = process.env.TVBOX_SUBSCRIBE_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'TVBOX 订阅未启用' }, { status: 403 });
  }
  const url = new URL('/api/tvbox/subscribe', request.url);
  url.searchParams.set('token', token);
  url.searchParams.set('adFilter', 'true');
  return NextResponse.redirect(url, 302);
}
