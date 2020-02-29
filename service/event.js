const { OPEN } = require('ws');
const jwt = require('jsonwebtoken');
const { handleLogin, handleRegister } = require('./login');
const { handleGetRoom, handleEnterRoom, handleExitRoom, handleStartGame, handleMove } = require('./room');
const { JWT_TOKEN, RES_STATUS, EVENT, TARGET } = require('../constant/generalConst');

module.exports = (db, wss, ws, msg) => {
    try {
        console.log('[handleEvent] - Start');
        const payload = JSON.parse(msg);
        const { token, event } = payload;
        console.log('[handleEvent] - Payload:');
        console.log(msg);
        if (EVENT.LOGIN === event) {
            handleLogin(db, ws, payload);
        } else if (EVENT.REGISTER === event) {
            handleRegister(db, ws, payload);
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
                    let resTarget = TARGET.SELF;
                    let res = {};
                    console.log('[handleEvent] - JWT decoded:');
                    console.log(decoded);
                    if(EVENT.GET_ROOM === event) {
                        res = handleGetRoom({ ...payload, ...decoded });
                    } else if(EVENT.ENTER_ROOM === event) {
                        resTarget = TARGET.BROADCAST;
                        res = handleEnterRoom(ws, { ...payload, ...decoded });
                    } else if (EVENT.EXIT_ROOM === event) {
                        resTarget = TARGET.BROADCAST;
                        res = handleExitRoom(ws, { ...payload, ...decoded });
                    } else if (EVENT.READY === event) {
                        resTarget = TARGET.ROOM;
                        res = handlePlayerReady({ ...payload, ...decoded });
                    } else if (EVENT.START_GAME === event) {
                        res = handleStartGame({ ...payload, ...decoded });
                    } else if (EVENT.MOVE === event) {
                        res = handleMove({ ...payload, ...decoded });
                    } else {
                        throw "No a valid event.";
                    }
                    res = JSON.stringify(res);
                    console.log(`[handleEvent] - Response: ${res}`);
                    if (TARGET.BROADCAST === resTarget) {
                        wss.clients.forEach( client => {
                            if (client.readyState === OPEN) {
                                client.send(res);
                            }
                        });
                    } else if(TARGET.ROOM === resTarget) {
                        const t = ws.room;
                        wss.clients.forEach( client => {
                            if (client.readyState === OPEN && t === client.room) {
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
        ws.send(JSON.stringify({
            status: RES_STATUS.E,
            msg: err,
        }));
        ws.terminate();
    }
}