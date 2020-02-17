const RES_STATUS = {
    S: 'S',
    F: 'F', //Require re-auth
    E: 'E', //Exception
} // Status F & E will respond with msg

const JWT_TOKEN = 'idctHomeWork';

const MAX_ROOM_AMOUNT = 3;


module.exports = {
    RES_STATUS,
    JWT_TOKEN
}