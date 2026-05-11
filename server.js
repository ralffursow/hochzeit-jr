const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const port = process.env.PORT || 3456;
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jpg': 'image/jpeg',
  '.ttf': 'font/truetype',
  '.woff2': 'font/woff2'
};
http.createServer((req, res) => {
  const fp = path.join(root, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
    res.writeHead(404); res.end('404'); return;
  }
  res.writeHead(200, {
    'Content-Type': mime[path.extname(fp)] || 'application/octet-stream',
    'Cache-Control': 'no-cache'
  });
  fs.createReadStream(fp).pipe(res);
}).listen(port, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
