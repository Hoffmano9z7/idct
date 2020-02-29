const MongoClient = require('mongodb').MongoClient;
const PROD_URI = "mongodb+srv://tictactoe:zxcvbnm123@adsassignment-qmne0.gcp.mongodb.net/test";
const DB = 'idct';

const connect = (uri) => {
    return MongoClient
    .connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        autoReconnect: true,
        connectTimeoutMS: 5000,
    })
    .then(client => client.db(DB))
    .catch(err => console.log(err))
}

module.exports = async function() {
    return await connect(PROD_URI);
}