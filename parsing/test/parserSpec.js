/**
 * Created by Sakari.Ruoho on 20/04/2015.
 */
var parser = require("../message-parser"),
    expect = require('chai').expect;

describe('IRC Parser test', function () {

    describe('Test message :testnick USER guest tolmoon tolsun :Ronnie Reagan', function () {

        var parsedMessage;

        beforeEach(function(done) {
            parsedMessage = parser.parseMessage(':testnick USER guest tolmoon tolsun :Ronnie Reagan');
            done();
        })

        it('should return prefix :testnick', function (done) {
            expect(parsedMessage.prefix).to.equal(':testnick');
            done();
        });

        it('should return command USER', function (done) {
            expect(parsedMessage.command).to.equal('USER');
            done();
        });

        it('should return command params guest,tolmoon,tolsun', function (done) {
            expect(parsedMessage.params.join()).to.equal('guest,tolmoon,tolsun');
            done();
        });

        it('should return trailing "Ronnie Reagan"', function (done) {
            expect(parsedMessage.trailing).to.equal('Ronnie Reagan');
            done();
        });
    });

    describe('Test message USER MyUsername 8 * :My real name', function () {

        var parsedMessage;

        beforeEach(function(done) {
            parsedMessage = parser.parseMessage('USER MyUsername 8 * :My real name');
            done();
        })

        it('should return undefined prefix', function (done) {
            expect(parsedMessage.prefix).be.an('undefined');
            done();
        });

        it('should return command USER', function (done) {
            expect(parsedMessage.command).to.equal('USER');
            done();
        });

        it('should return command params MyUsername 8 *', function (done) {
            expect(parsedMessage.params.join()).to.equal('MyUsername,8,*');
            done();
        });

        it('should return trailing "My real name"', function (done) {
            expect(parsedMessage.trailing).to.equal('My real name');
            done();
        });
    });


    describe('Test message :Trillian SQUIT cm22.eng.umd.edu :Server out of control', function () {

        var parsedMessage;

        beforeEach(function(done) {
            parsedMessage = parser.parseMessage(':Trillian SQUIT cm22.eng.umd.edu :Server out of control');
            done();
        })

        it('should return prefix :Trillian', function (done) {
            expect(parsedMessage.prefix).to.equal(':Trillian');
            done();
        });

        it('should return command SQUIT', function (done) {
            expect(parsedMessage.command).to.equal('SQUIT');
            done();
        });

        it('should return params cm22.eng.umd.edu', function (done) {
            expect(parsedMessage.params.join()).to.equal('cm22.eng.umd.edu');
            done();
        });

        it('should return trailing "Server out of control"', function (done) {
            expect(parsedMessage.trailing).to.equal('Server out of control');
            done();
        });
    });


    describe('Test message JOIN #foo,#bar fubar,foobar', function () {

        var parsedMessage;

        beforeEach(function(done) {
            parsedMessage = parser.parseMessage('JOIN #foo,#bar fubar,foobar');
            done();
        })

        it('should return prefix to be undefined', function (done) {
            expect(parsedMessage.prefix).be.an('undefined');
            done();
        });

        it('should return command JOIN', function (done) {
            expect(parsedMessage.command).to.equal('JOIN');
            done();
        });

        it('should return params #foo,#bar fubar,foobar', function (done) {
            expect(parsedMessage.params.join(" ")).to.equal('#foo,#bar fubar,foobar');
            done();
        });

        it('should return command trailing to be undefined', function (done) {
            expect(parsedMessage.trailing).be.an('undefined');
            done();
        });
    });


    describe('Test message :Trillian PRIVMSG #nsb_radio :message with emoticon :)', function () {

        var parsedMessage;

        beforeEach(function(done) {
            parsedMessage = parser.parseMessage(':Trillian PRIVMSG #nsb_radio :message with emoticon :)');
            done();
        })

        it('should return prefix :Trillian', function (done) {
            expect(parsedMessage.prefix).to.equal(':Trillian');
            done();
        });

        it('should return command PRIVMSG', function (done) {
            expect(parsedMessage.command).to.equal('PRIVMSG');
            done();
        });

        it('should return params #nsb_radio', function (done) {
            expect(parsedMessage.params.join()).to.equal('#nsb_radio');
            done();
        });

        it('should return command trailing "message with emoticon :)"', function (done) {
            expect(parsedMessage.trailing).to.equal('message with emoticon :)');
            done();
        });
    });

    describe('Test message :Trillian PRIVMSG #nsb_radio :', function () {

        var parsedMessage;

        beforeEach(function(done) {
            parsedMessage = parser.parseMessage(':Trillian PRIVMSG #nsb_radio :');
            done();
        })

        it('should return prefix :Trillian', function (done) {
            expect(parsedMessage.prefix).to.equal(':Trillian');
            done();
        });

        it('should return command PRIVMSG', function (done) {
            expect(parsedMessage.command).to.equal('PRIVMSG');
            done();
        });

        it('should return params #nsb_radio', function (done) {
            expect(parsedMessage.params.join()).to.equal('#nsb_radio');
            done();
        });

        it('should return command trailing "message with emoticon :)"', function (done) {
            expect(parsedMessage.trailing).to.equal('');
            done();
        });
    });
});
