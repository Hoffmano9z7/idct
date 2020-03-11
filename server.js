const { Server } = require('ws');
const wss = new Server({port: process.env.PORT || 5000});
const handleEvent = require('./service/event');
const initializeDatabases = require('./conn');

initializeDatabases().then(db => {
    wss.on('connection', ws => {
        console.log('New connection opened!')
        ws.on('message', msg => handleEvent(db, wss, ws, msg));
    });
    wss.on('error', e => {
        console.log(e);
    });
}).catch( err => {
    console.error('Failed to make all database connections!');
    console.error(err);
    process.exit(1);
})
