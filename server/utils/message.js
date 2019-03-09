const moment = require('moment');

const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf(),
    };
}

const generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com.ua/maps/@${latitude},${longitude}z?hl=ru`,
        createdAt: moment().valueOf(),
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
}