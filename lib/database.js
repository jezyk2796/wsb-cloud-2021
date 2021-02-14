const mongodb = require('mongodb');
const mongodbClient = mongodb.MongoClient;

let _db;
let uri = 'mongodb://wsb-db:v3XHOf2yBGmrQODSmO948uTwgXHNcU33RYchxYGmqZaHitTtweIgVFHA13GCEOOsNrTEhGb2AgOo5q8ckz6A6g==@wsb-db.documents.azure.com:10250/mean?ssl=true&sslverifycertificate=false';

if (process.env.NODE_ENV) {
    //localhost
    uri = 'mongodb://root:root@localhost:27017/wsb_db?authMechanism=SCRAM-SHA-1&authSource=admin';
}


const mongoDBConnect = callback => {
    mongodbClient.connect(
            uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        .then(client => {
            _db = client.db();
            console.log('Connected!');
            callback(client);
        })
        .catch(err => {
            console.log(err);
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoDBConnect = mongoDBConnect;
exports.getDb = getDb;
