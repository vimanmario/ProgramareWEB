const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3029;

const server = http.createServer((req, res) => {
    let filePath = '';

    // Setarea caii de acces în funcție de extensia fișierului
    if (req.url.endsWith('.html')) {
        filePath = `./public/HTML${req.url}`;
    } else if (req.url.endsWith('.css')) {
        // Ajustarea caii pentru fișierele CSS
        filePath = `./public${req.url}`;
    } else if (req.url.endsWith('.js')) {
        // Ajustarea caii pentru fișierele JS
        filePath = `./public${req.url}`;
    } else {
        // Dacă cererea este pentru un director, încărcăm index.html implicit
        if (req.url.endsWith('/')) {
            filePath = `./public/HTML${req.url}index.html`;
        } else {
            // Altfel, căutăm fișierele în directorul public corespunzător extensiei
            filePath = `./public${req.url}`;
        }
    }

    // Afișare calea fișierului încercat
    console.log('Calea fișierului încercat:', filePath);

    // Citirea și servirea fișierului
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
            // Determinarea tipului de conținut
            let contentType = 'text/html';
            if (filePath.endsWith('.css')) {
                contentType = 'text/css';
            } else if (filePath.endsWith('.js')) {
                contentType = 'text/javascript';
            }

            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Serverul rulează la adresa http://localhost:${port}/`);
});
