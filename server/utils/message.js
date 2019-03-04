const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
}

const generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com.ua/maps/@${latitude},${longitude}z?hl=ru`,
        createdAt: new Date().getTime(),
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
}