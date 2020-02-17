const { RES_STATUS } = require('../constant/generalConst');
const room = [];

const handleGetRoom = (ws, payload) => {
    console.log('[handleGetRoom] - Start');
    const { id } = payload;
    const token = signAuth(id);
    let res = {
        status: RES_STATUS.S,
        room,
        token
    }
    console.log('[handleGetRoom] - End');
    return res;
}

const handleEnterRoom = (ws, payload) => {
    console.log('[handleEnterRoom] - Start');

    let res = {
        status: RES_STATUS.S,
        room,
    }
    console.log('[handleEnterRoom] - End');
    return res;
}

module.exports = {
    handleGetRoom, 
    handleEnterRoom,
}