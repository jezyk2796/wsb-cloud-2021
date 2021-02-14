const mongodb = require('mongodb');
const getDB = require('../lib/database').getDb;

module.exports = class Product {
    constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    save() {
        const db = getDB();
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(id) {
        const db = getDB();
        return db.collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(id) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}