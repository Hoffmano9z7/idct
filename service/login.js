const { RES_STATUS } = require('../constant/generalConst');
const { signAuth } = require('../util/generalUtil');

module.exports = (ws, payload) => {
    console.log('[handleLogin] - Start');
    const { id } = payload;
    const user = {
        id
    }
    const token = signAuth(user);
    let res = {
        status: RES_STATUS.S,
        id,
        token
    }
    res = JSON.stringify(res);
    console.log(`[handleLogin] - Response: ${res}`);
    ws.send(res);
    console.log('[handleLogin] - End');
}