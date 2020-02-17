const { RES_STATUS, MAX_ROOM_AMOUNT } = require('../constant/generalConst');
const { isObjEmpty } = require('../util/generalUtil');

let room = [];
const roomSchma = {
    a: '',
    b: '',
    s: [],
}

const createDefaultRoom = () => {
    for(let i=0; i<3; i++) {
        room.push({ ...roomSchma });
    }
};
createDefaultRoom();

const handleGetRoom = payload => {
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

const handleEnterRoom = payload => {
    console.log('[handleEnterRoom] - Start');

    const { roomNum, id } = payload;
    let newRoomObj = room[roomNum];
    if(!newRoomObj.a) {
        newRoomObj.a = id;
    } else if (!newRoomObj.b) {
        newRoomObj.b = id;
    } else {
        newRoomObj.s.push(id);
    }
    console.log('test');
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