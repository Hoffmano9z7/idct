const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../constant/generalConst');

const signAuth = payload => {
    return jwt.sign(payload, JWT_TOKEN, {
        expiresIn : 15 * 60 * 1000 // 15 mins
    });
}

const checkMoveValidation = (room, move) => {

}

const checkOblique = moves => {
    if (!!moves[0][0] && !!moves[1][1] && !!moves[2][2])
        return true;
    if (!!moves[0][2] && !!moves[1][1] && !!moves[2][0])
        return true;
    return false;
}

const checkVertical = moves => {
    for (let h=0; h<moves.length; h++) {
inner:
        for (const i=0; i<h.length; i++) {
            if (!moves[i][h])
                break inner;
            else if (h.length-1 === i) 
                return true;
        }
    }
    return false;
}

const checkHorizontal = moves => {
    for (const h in moves) {
inner:
        for (const i=0; i<h.length; i++) {
            const m = h[i];
            if (!m)
                break inner;
            else if (h.length-1 === i) 
                return true;
        }
    }
    return false;
}

const checkIsMoveWin = (moves) => {
    if (checkHorizontal)
        return true;
    if (checkVertical)
        return true;
    if (checkOblique)
        return true;
    return false;
} 

module.exports = {
    signAuth,
    checkMoveValidation,
    checkIsMoveWin,
}