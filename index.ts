import { $ } from "bun";

const pageHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ytdwn</title>
    <style>
      :root {
        color-scheme: dark;
        --bg0: #05060a;
        --bg1: #0b1020;
        --card: rgba(255, 255, 255, 0.06);
        --cardBorder: rgba(255, 255, 255, 0.12);
        --text: rgba(255, 255, 255, 0.92);
        --muted: rgba(255, 255, 255, 0.70);
        --muted2: rgba(255, 255, 255, 0.55);
        --shadow: 0 18px 80px rgba(0, 0, 0, 0.55);
        --ring: 0 0 0 4px rgba(99, 102, 241, 0.25);
        --accent0: #22c55e;
        --accent1: #60a5fa;
        --accent2: #a78bfa;
        --danger: #fb7185;
      }

      * { box-sizing: border-box; }
      html, body { height: 100%; }

      body {
        margin: 0;
        font-family:
          ui-sans-serif,
          system-ui,
          -apple-system,
          Segoe UI,
          Roboto,
          Helvetica,
          Arial,
          "Apple Color Emoji",
          "Segoe UI Emoji";
        color: var(--text);
        background:
          radial-gradient(1200px 700px at 15% 15%, rgba(96, 165, 250, 0.22), transparent 55%),
          radial-gradient(1000px 600px at 80% 10%, rgba(167, 139, 250, 0.18), transparent 50%),
          radial-gradient(900px 700px at 30% 90%, rgba(34, 197, 94, 0.14), transparent 55%),
          linear-gradient(180deg, var(--bg0), var(--bg1));
        overflow-x: hidden;
      }

      .wrap {
        min-height: 100%;
        display: grid;
        place-items: center;
        padding: 48px 16px;
      }

      .card {
        width: min(760px, 100%);
        border: 1px solid var(--cardBorder);
        background: var(--card);
        border-radius: 18px;
        box-shadow: var(--shadow);
        backdrop-filter: blur(14px);
        padding: 22px;
      }

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 18px;
      }

      .brand {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .brand h1 {
        font-size: 22px;
        line-height: 1.15;
        margin: 0;
        letter-spacing: 0.2px;
      }

      .brand p {
        margin: 0;
        color: var(--muted);
        font-size: 13px;
      }

      form {
        display: grid;
        gap: 12px;
        margin: 0;
      }

      .row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
      }

      @media (max-width: 520px) {
        .row { grid-template-columns: 1fr; }
      }

      label {
        display: block;
        font-size: 12px;
        color: var(--muted2);
        margin: 0 0 6px 2px;
      }

      .input {
        width: 100%;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(0, 0, 0, 0.22);
        color: var(--text);
        padding: 14px 14px;
        font-size: 14px;
        outline: none;
        transition: box-shadow 160ms ease, border-color 160ms ease, transform 160ms ease;
      }

      .input::placeholder { color: rgba(255, 255, 255, 0.35); }
      .input:focus {
        border-color: rgba(99, 102, 241, 0.5);
        box-shadow: var(--ring);
      }

      .btn {
        border: 0;
        border-radius: 14px;
        padding: 14px 16px;
        font-weight: 600;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.96);
        cursor: pointer;
        background:
          radial-gradient(120px 60px at 20% 20%, rgba(255, 255, 255, 0.18), transparent 60%),
          linear-gradient(135deg, rgba(96, 165, 250, 0.9), rgba(167, 139, 250, 0.85));
        box-shadow: 0 12px 32px rgba(99, 102, 241, 0.22);
        transition: transform 160ms ease, filter 160ms ease;
        align-self: end;
      }

      .btn:hover { transform: translateY(-1px); filter: brightness(1.05); }
      .btn:active { transform: translateY(0px); filter: brightness(0.98); }
      .btn:disabled { cursor: not-allowed; opacity: 0.7; transform: none; }

      .hint {
        color: var(--muted2);
        font-size: 12px;
        line-height: 1.4;
        margin: 0;
      }

      .status {
        display: none;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(0, 0, 0, 0.18);
        font-size: 13px;
        color: rgba(255, 255, 255, 0.82);
      }

      .status[data-kind="ok"] { border-color: rgba(34, 197, 94, 0.35); }
      .status[data-kind="err"] { border-color: rgba(251, 113, 133, 0.35); color: rgba(255, 255, 255, 0.90); }

      .footer {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: wrap;
      }

      .kbd {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.75);
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.14);
        padding: 4px 8px;
        border-radius: 10px;
      }

      a { color: rgba(96, 165, 250, 0.95); text-decoration: none; }
      a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <main class="card">
        <div class="top">
          <div class="brand">
            <h1>ytdwn</h1>
            <p>download videos with yt-dlp</p>
          </div>
        </div>

        <form id="dlForm" method="post" action="/download">
          <div>
            <label for="url">video url</label>
            <div class="row">
              <input
                class="input"
                id="url"
                name="url"
                type="url"
                inputmode="url"
                autocomplete="off"
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                required
              />
              <button class="btn" id="submitBtn" type="submit">download</button>
            </div>
          </div>

          <p class="hint">
            paste a link, press <span class="kbd">enter</span>, and we’ll do the rest.
          </p>

          <div class="status" id="status" aria-live="polite"></div>

          <div class="footer">
            <span class="hint">tip: works best with direct video pages (not search results)</span>
            <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" rel="noreferrer">yt-dlp docs</a>
          </div>
        </form>
      </main>
    </div>

    <script>
      const form = document.getElementById("dlForm");
      const urlEl = document.getElementById("url");
      const statusEl = document.getElementById("status");
      const btn = document.getElementById("submitBtn");

      const show = (kind, msg) => {
        statusEl.dataset.kind = kind;
        statusEl.textContent = msg;
        statusEl.style.display = "block";
      };

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        statusEl.style.display = "none";
        const url = urlEl.value.trim();
        if (!url) return;

        btn.disabled = true;
        btn.textContent = "starting…";

        try {
          const res = await fetch("/download", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ url }),
          });

          const text = await res.text();
          if (!res.ok) {
            show("err", text || "failed");
          } else {
            show("ok", text || "queued");
          }
        } catch {
          show("err", "network error");
        } finally {
          btn.disabled = false;
          btn.textContent = "download";
        }
      });

      window.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          urlEl.focus();
          urlEl.select();
        }
      });
    </script>
  </body>
</html>`;

Bun.serve({
  port: 42070,
  routes: {
    "/": () =>
      new Response(pageHtml, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
        },
      }),
    "/download/:url": {
      POST: async (req) => {
        const url = req.params.url;
        $`echo ${url}`;
        // yt-dlp this bad boy and send it to the client

        return new Response(`downloading`);
      },
    },
  },
});

console.log("Running");
