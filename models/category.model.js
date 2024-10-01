const db = require('../config/db');

const Category = {
    getAll: (callback) => {
        db.query('SELECT * FROM categories', callback);
    },

    findByName: (name, callback) => {
        const sql = 'SELECT * FROM categories WHERE name = ?';
        db.query(sql, [name], (err, results) => {
            if (err) return callback(err);
            callback(null, results.length > 0 ? results[0] : null);
        });
    },

    create: (name, callback) => {
        const sql = 'INSERT INTO categories (name) VALUES (?)';
        db.query(sql, [name], callback);
    }
};

module.exports = Category;
