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
    if (1 === moves[0][0] && 1 === moves[1][1] && 1 === [2][2])
        return true;
    if (1 === moves[0][2] && 1 === moves[1][1] && 1 === [2][0])
        return true;
    return false;
}

const checkVertical = moves => {
    for (let h=0; h<moves.length; h++) {
inner:
        for (const i=0; i<h.length; i++) {
            if (0 === moves[i][h])
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
            if (0 === m)
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