# ytdwn

a tiny self-hosted web ui that downloads videos using [`yt-dlp`](https://github.com/yt-dlp/yt-dlp).

you paste a video url, hit download, and the server streams `yt-dlp`'s output back to your browser as a file download.

## requirements

- **bun**: runtime for the server
- **yt-dlp**: must be on `PATH` for the server process
