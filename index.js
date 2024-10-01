const http = require('http');
const routes = require('./routes/routes');

const server = http.createServer((req, res) => {
    routes(req, res);
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
