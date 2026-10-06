/**
 * Cloudflare Workers エントリーポイント
 * MBErpg.html をレスポンスとして返す静的配信 Worker
 */

// MBErpg.html をバンドル時にテキストとしてインポート
import html from '../MBErpg.html';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // ルートパス（/ または /index.html）のみ HTML を返す
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
          // キャッシュ設定：ゲームの更新を即時反映させるため短めに設定
          'Cache-Control': 'public, max-age=300',
        },
      });
    }

    // それ以外は 404
    return new Response('Not Found', { status: 404 });
  },
};
