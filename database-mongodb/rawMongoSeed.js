const generateData = require('./dataGenerator').generateData;
const getBenchmark = require('./dataGenerator').getBenchmark;
const fs = require('fs')
const { db } = require('./index.js');
const colors = require('colors');

const totalStart = process.hrtime.bigint();

async function seed(set, batch, time) {
    // let insertCount = 0
    console.log('Seeding Data...'.yellow)
    let data = generateData(set, batch)
    for (let products of data) {
        // insertCount += products.length;
        await db.collection('products').insertMany(products)
            // console.log(`inserted so far: ${insertCount}`)
    }
    console.log('Data Seeded!'.green)

    totalEnd = process.hrtime.bigint();
    console.log(getBenchmark(time, totalEnd, 'Total', set * batch))
}
seed(10000, 1000, totalStart)
    .then(() => db.close())