const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('hould generate correct message object', () => {
        var message = generateMessage('Denis', 'Test message');

        expect(message.from).toBe('Denis');
        expect(message.text).toBe('Test message');
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('hould generate correct location object', () => {
        let from = 'Denis';
        let latitude = 13;
        let longitude = 17;
        let url = 'https://www.google.com.ua/maps/@13,17z?hl=ru';

        let locationMessage = generateLocationMessage(from, latitude, longitude);

        expect(locationMessage.from).toBe('Denis');
        expect(locationMessage.url).toBe(url);
        expect(locationMessage.createdAt).toBeA('number');

    });
});
