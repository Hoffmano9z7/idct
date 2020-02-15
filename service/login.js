const { RES_STATUS } = require('../constant/generalConst');
const { signAuth } = require('../util/generalUtil');

module.exports = (ws, payload) => {
    console.log('[handleLogin] - Start');
    const { id, pw } = payload;

    //TODO: dummy user. Add DAO to access db
    const user = {
        id: "abc"
    }
    const token = signAuth(payload);
    let res = {
        status: RES_STATUS.S,
        id: user.id,
        token
    }
    res = JSON.stringify(res);
    console.log(`[handleLogin] - Response: ${res}`);
    ws.send(res);
    console.log('[handleLogin] - End');
}