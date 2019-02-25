const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('hould generate correct message object', () => {
        var message = generateMessage('Denis', 'Test message');

        expect(message.from).toBe('Denis');
        expect(message.text).toBe('Test message');
        expect(message.createdAt).toBeA('number')
    });
});