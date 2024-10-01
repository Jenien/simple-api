const Item = require('../models/item.model');

const ItemController = {
    getAllItems: (req, res) => {
        Item.getAll((err, results) => {
            if (err) return res.writeHead(500).end('Error fetching items');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    },

    getItemById: (req, res) => {
        const id = req.url.split('/')[2];

        if (!id || isNaN(id)) {
            return res.writeHead(400, { 'Content-Type': 'application/json' })
                .end(JSON.stringify({ error: 'Invalid ID provided' }));
        }
    
        Item.getById(id, (err, results) => {
            if (err) {
                return res.writeHead(500, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ error: 'Error fetching item' }));
            }
    
            if (results.length === 0) {
                return res.writeHead(404, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ error: 'Item not found' }));
            }
    
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results[0]));
        });
    },
    

    createItem: (req, res) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { category_id, name, description, price } = JSON.parse(body);
    

            if (!category_id || !name || price == null) {
                return res.writeHead(400, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ error: 'category_id, name, and price are required' }));
            }

            if (name.trim() === '') {
                return res.writeHead(400, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ error: 'Item name cannot be empty' }));
            }

            if (typeof price !== 'number' || price <= 0) {
                return res.writeHead(400, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ error: 'Price must be a positive number' }));
            }
    

            Item.create(category_id, name, description, price, (err, result) => {
                if (err) {
                    return res.writeHead(500, { 'Content-Type': 'application/json' })
                        .end(JSON.stringify({ error: 'Error creating item' }));
                }

                const createdItem = {
                    id: result.insertId,
                    category_id: category_id,
                    name: name,
                    description: description || '',
                    price: price
                };
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(createdItem));
            });
        });
    },
    

    updateItem: (req, res) => {
        const id = req.url.split('/')[2];
        let body = '';
    
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { category_id, name, description, price } = JSON.parse(body);

            if (!id || isNaN(id)) {
                return res.writeHead(400, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ error: 'Invalid ID provided' }));
            }
    

            Item.getById(id, (err, results) => {
                if (err) {
                    return res.writeHead(500, { 'Content-Type': 'application/json' })
                        .end(JSON.stringify({ error: 'Error fetching item' }));
                }
    
                if (results.length === 0) {
                    return res.writeHead(404, { 'Content-Type': 'application/json' })
                        .end(JSON.stringify({ error: 'Item not found' }));
                }
    
                const existingItem = results[0];

                const updatedCategoryId = category_id !== undefined ? category_id : existingItem.category_id;
                const updatedName = name !== undefined ? name : existingItem.name;
                const updatedPrice = price !== undefined ? price : existingItem.price;
    
                if (updatedName.trim() === '') {
                    return res.writeHead(400, { 'Content-Type': 'application/json' })
                        .end(JSON.stringify({ error: 'Item name cannot be empty' }));
                }
    
                if (typeof updatedPrice !== 'number' || updatedPrice <= 0) {
                    return res.writeHead(400, { 'Content-Type': 'application/json' })
                        .end(JSON.stringify({ error: 'Price must be a positive number' }));
                }
    
                Item.update(id, updatedCategoryId, updatedName, description || existingItem.description, updatedPrice, (err, result) => {
                    if (err) {
                        return res.writeHead(500, { 'Content-Type': 'application/json' })
                            .end(JSON.stringify({ error: 'Error updating item' }));
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Item updated successfully', item: { id, category_id: updatedCategoryId, name: updatedName, description: description || existingItem.description, price: updatedPrice } }));
                });
            });
        });
    },
    

    deleteItem: (req, res) => {
        const id = req.url.split('/')[2];
    
        if (!id || isNaN(id)) {
            return res.writeHead(400, { 'Content-Type': 'application/json' })
                .end(JSON.stringify({ error: 'Invalid ID provided' }));
        }

        Item.delete(id, (err, result) => {
            if (err) {
                return res.writeHead(500, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ error: 'Error deleting item' }));
            }
    
            if (result.affectedRows === 0) {
                return res.writeHead(404, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ error: 'Item not found' }));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Item deleted successfully' }));
        });
    }
    
};

module.exports = ItemController;
