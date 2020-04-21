const mongoose = require('mongoose');
const productSchema = require('./schema');
const colors = require('colors');
const localhost = '127.0.0.1'
const ec2Mongo = '54.183.153.156'
const { ObjectId } = require('mongodb');


const { MongoClient } = require('mongodb');

mongoose.connect(`mongodb://${ec2Mongo}/NykeReviews`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DATABASE ON'.cyan);
    db.createCollection('products')
    db.collection('products').createIndex({ 'productId': 1 })
        .then(() => console.log('Mongo Indexed!'))
        .catch(() => console.log('Mongo already Indexed'))
});

// var Product = mongoose.model('Product', productSchema);
const product = db.collection('products')

module.exports = {
    product: product,
    db: db
};