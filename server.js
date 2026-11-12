/**
 * SkillBridge - Local Static Web Server
 * Zero-dependency pure Node.js HTTP server.
 * Run using: node server.js  OR  npm start
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Normalize URL
  let safePath = path.normalize(decodeURI(req.url.split('?')[0])).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, safePath);

  // Security check: ensure filePath is within PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // If file not found, try fallback or return 404
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h2>404 - File Not Found</h2>
          <p>Requested: ${req.url}</p>
          <a href="/" style="color: #6366f1;">Return to SkillBridge Dashboard</a>
        </div>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('\n======================================================');
  console.log('   🎓 SkillBridge - Skill Exchange Platform Server');
  console.log('======================================================');
  console.log(`\n  🚀 Dashboard running at: \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
  console.log(`  📂 Root folder:          ${PUBLIC_DIR}`);
  console.log(`  💡 Press \x1b[33mCtrl+C\x1b[0m to stop the server anytime.\n`);
  console.log('======================================================\n');
});
