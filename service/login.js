const { RES_STATUS, EVENT } = require('../constant/generalConst');
const { signAuth } = require('../util/generalUtil');

const handleLogin = (db, ws, payload) => {
    console.log('[handleLogin] - Start');
    const { id, pw } = payload;
    if (!id)
        throw "User Id cannot be empty!";
    if (!pw)
        throw "Password cannot be empty!";
    
    const query = {
        name: id,
        pw
    }

    db.collection('user').findOne(query, { projection: { pw: 0 } }, (err, result) => {
        let res = {};
        if (err) {
            console.log(err);
            throw "Server error, please try again!";
        } else if (!result) {
            res.status = RES_STATUS.F;
            res.msg = "Invalid user id or password!"; //TODO: Hoffman - Change to const
        } else {
            const token = signAuth({id});
            res.status = RES_STATUS.S;
            res.id = id;
            res.token = token;
            res.action = EVENT.LOBBY;
        }
        res = JSON.stringify(res);
        console.log(`[handleLogin] - Response: ${res}`);
        ws.send(res);
        console.log('[handleLogin] - End');    
    });
}

const handleRegister = (db, ws, payload) => {
    console.log('[handleRegister] - Start');
    const { id, pw } = payload;
    if (!id)
        throw "User Id cannot be empty!";
    if (!pw)
        throw "Password cannot be empty!";

    const query = {
        name: id
    }

    db.collection('user').findOne(query, (err, result) => {
        let res = {};
        if (err) {
            console.log(err);
            throw "Server error, please try again!";
        } else if (result) {
            res.status = RES_STATUS.F;
            res.msg = "This user Id has been used!"; //TODO: Hoffman - Change to const
            res = JSON.stringify(res);
            console.log(`[handleRegister] - Response: ${res}`);
            ws.send(res);
            console.log('[handleRegister] - End');
        } else {
            query.pw = pw;
            db.collection('user').insertOne(query, (err, result) => {
                if (err) {
                    console.log(err);
                    throw "Server error, please try again!";
                } else {
                    const token = signAuth({id});
                    res.status = RES_STATUS.S;
                    res.id = id;
                    res.token = token;
                    res.action = EVENT.LOBBY;
                    res = JSON.stringify(res);
                    console.log(`[handleRegister] - Response: ${res}`);
                    ws.send(res);
                    console.log('[handleRegister] - End');
                }
            });
        }
    });
}

module.exports = {
    handleLogin,
    handleRegister,
}