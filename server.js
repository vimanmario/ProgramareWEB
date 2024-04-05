const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3029;

const server = http.createServer((req, res) => {
    let filePath = './public' + req.url; // Amend the file path to match your directory structure
    if (filePath === './public/') {
        filePath = './public/HTML/index.html';
    } else{

    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('Internal Server Error');
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Serverul rulează la adresa http://localhost:${port}/`);
});
