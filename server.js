const { Server } = require('ws');
const wss = new Server({port: process.env.PORT || 5000});
const handleEvent = require('./service/event');
const initializeDatabases = require('./conn');

initializeDatabases().then(db => {
    wss.on('connection', ws => {
        ws.on('message', msg => handleEvent(db, wss, ws, msg));
    });
}).catch( err => {
    console.error('Failed to make all database connections!');
    console.error(err);
    process.exit(1);
})
