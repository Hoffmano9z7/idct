const { Server } = require('ws');
const wss = new Server({port: process.env.PORT || 5000});
const handleEvent = require('./service/event');

wss.on('connection', ws => {
    ws.on('message', msg => handleEvent(ws, msg));
});