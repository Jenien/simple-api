const CategoryController = require('../controllers/category.controller');
const ItemController = require('../controllers/item.controller');

const routes = (req, res) => {
    if (req.method === 'GET' && req.url === '/categories') {
        CategoryController.getAllCategories(req, res);
    } else if (req.method === 'POST' && req.url === '/categories') {
        CategoryController.createCategory(req, res);
    } else if (req.method === 'GET' && req.url === '/items') {
        ItemController.getAllItems(req, res);
    } else if (req.method === 'GET' && req.url.startsWith('/items/')) {
        ItemController.getItemById(req, res);
    } else if (req.method === 'POST' && req.url === '/items') {
        ItemController.createItem(req, res);
    } else if (req.method === 'PUT' && req.url.startsWith('/items/')) {
        ItemController.updateItem(req, res);
    } else if (req.method === 'DELETE' && req.url.startsWith('/items/')) {
        ItemController.deleteItem(req, res);
    } else {
        res.writeHead(404).end('Not Found');
    }
};

module.exports = routes;
