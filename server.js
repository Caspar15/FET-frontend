const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const root = __dirname;

const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
};

http
  .createServer((req, res) => {
    let decodedUrl;
    try {
      decodedUrl = decodeURIComponent(req.url.split("?")[0]);
    } catch {
      decodedUrl = req.url.split("?")[0];
    }

    // 2️⃣ / 對應到 index.html，其它就照原路徑
    let urlPath = decodedUrl === "/" ? "/index.html" : decodedUrl;
    let filePath = path.join(root, urlPath);
    let ext = path.extname(filePath);

    // 3️⃣ 如果沒有副檔名，就加 .html（方便 /pages/quiz 也能對應 quiz.html）
    if (!ext) {
      filePath += ".html";
      ext = ".html";
    }

    // 4️⃣ 讀檔並回傳
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        } else {
          res.writeHead(500);
          res.end("500 Internal Server Error");
        }
        return;
      }
      res.writeHead(200, {
        "Content-Type": mime[ext] || "application/octet-stream",
      });
      res.end(data);
    });
  })
  .listen(PORT, () => {
    console.log(`🚀 Static server running at http://localhost:${PORT}/`);
  });
