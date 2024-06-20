const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
  const folder = process.argv.length > 2 ? process.argv[2] : "node1";
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<ul>");
  try {
    const files = await fs.readdir(folder);
    files.forEach((file) => {
      res.write(`<li>${file}</li>`);
    });
  } catch (err) {
    res.write("Diretorio não existe");
  }
  res.write("</ul>");
  res.end();
});

server.listen(3333);
