const db = require('../config/db');

const Item = {
    getAll: (callback) => {
        db.query('SELECT items.*, categories.name AS category_name FROM items JOIN categories ON items.category_id = categories.id', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT items.*, categories.name AS category_name FROM items JOIN categories ON items.category_id = categories.id WHERE items.id = ?', [id], callback);
    },

    create: (categoryId, name, description, price, callback) => {
        db.query('INSERT INTO items (category_id, name, description, price) VALUES (?, ?, ?, ?)', [categoryId, name, description, price], callback);
    },

    update: (id, categoryId, name, description, price, callback) => {
        db.query('UPDATE items SET category_id = ?, name = ?, description = ?, price = ? WHERE id = ?', [categoryId, name, description, price, id], callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM items WHERE id = ?', [id], callback);
    }
};

module.exports = Item;
