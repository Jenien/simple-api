const Category = require('../models/category.model');

const CategoryController = {
    getAllCategories: (req, res) => {
        Category.getAll((err, results) => {
            if (err) return res.writeHead(500).end('Error fetching categories');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    },

    createCategory: (req, res) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const { name } = JSON.parse(body);

            if (!name || name.trim() === '') {
                return res.writeHead(400, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({ error: 'Category name cannot be empty' }));
            }
    
            Category.findByName(name, (err, existingCategory) => {
                if (err) {
                    return res.writeHead(500, { 'Content-Type': 'application/json' })
                        .end(JSON.stringify({ error: 'Error checking for existing category' }));
                }
                if (existingCategory) {
                    return res.writeHead(400, { 'Content-Type': 'application/json' })
                        .end(JSON.stringify({ error: 'Category name already exists' }));
                }

                Category.create(name, (err, result) => {
                    if (err) {
                        return res.writeHead(500, { 'Content-Type': 'application/json' })
                            .end(JSON.stringify({ error: 'Error creating category' }));
                    }
                    
                    const createdCategory = {
                        id: result.insertId,
                        name: name
                    };
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(createdCategory));
                });
            });
        });
    }
    
};

module.exports = CategoryController;
