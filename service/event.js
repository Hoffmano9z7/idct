const { OPEN } = require('ws');
const jwt = require('jsonwebtoken');
const handleLogin = require('./login');
const { handleGetRoom, handleEnterRoom } = require('./room');
const { JWT_TOKEN, RES_STATUS } = require('../constant/generalConst');

module.exports = (wss, ws, msg) => {
    try {
        console.log('[handleEvent] - Start');
        let isBraodcast = false;
        const payload = JSON.parse(msg);
        const { token, event } = payload;
        console.log('[handleEvent] - Payload:');
        console.log(msg);

        if('login' === event) {
            handleLogin(ws, payload);
        } else {
            jwt.verify(token, JWT_TOKEN, (err, decoded) => {
                if (err) {
                    let res = {
                        status: RES_STATUS.F,
                        msg: 'You may required to login.',
                    }
                    res = JSON.stringify(res);
                    console.log(`[handleEvent] - Response: ${res}`);
                    ws.send(res);
                    ws.terminate();
                } else {
                    console.log('[handleEvent] - JWT decoded:');
                    console.log(decoded);
                    let res = {};
                    if('getRoom' === event) {
                        res = handleGetRoom({ ...payload, ...decoded });
                    } else if('enterRoom' === event) {
                        isBraodcast = true;
                        res = handleEnterRoom({ ...payload, ...decoded });
                    } else {
                        throw 'No a valid event.';
                    }
                    res = JSON.stringify(res);
                    console.log(`[handleEvent] - Response: ${res}`);
                    if (isBraodcast) {
                        wss.clients.forEach( client => {
                            if (client.readyState === OPEN) {
                                client.send(res);
                            }
                        });
                    } else {
                        ws.send(res);
                    }
                }
            });
        }
        console.log('[handleEvent] - End');
    } catch(err) {
        console.log(`[handleEvent] - Error: ${err}`);
        ws.send({
            status: RES_STATUS.E,
            msg: 'Error',
        });
        ws.terminate();
    }
}