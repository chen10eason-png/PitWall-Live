# PitWall Live V1.1

這一版移除所有會被誤認為真實 LIVE 的 Demo 排名。

## 資料來源
- Formula 1 官方網站：最終核對來源（Calendar / Results / Standings）。
- OpenF1：程式化 sessions、championship、timing、intervals、stints、pit、race control。
- `data/official-snapshot.json`：最後一次人工核對的官方快照，只有在網路/API 無法取得時才作為 fallback，介面會明確標示來源。

## GitHub Pages
把所有檔案保持原目錄結構上傳 repository 根目錄即可。

## LIVE 限制
OpenF1 即時資料需授權方案。不要把 access token 寫在 `app.js` 或任何 GitHub Pages 公開檔案。正式 LIVE 應加入後端代理（例如 Supabase Edge Function / Cloudflare Worker），由後端持有 Token。

## 更新策略
- 瀏覽器開啟時立即查 OpenF1。
- 一般結構化資料每 15 分鐘重新整理。
- LIVE 頁開啟時每 5 秒嘗試刷新。
- 若 API 無資料或未授權，顯示 OFFLINE / AUTH REQUIRED，不生成假資料。
