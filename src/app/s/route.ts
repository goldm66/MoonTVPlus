import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * 短地址：/s -> 带 token 的 TVBOX 订阅链接。
 * 电视上遥控器输入一长串订阅地址太痛苦，这里给一个极短的入口。
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
