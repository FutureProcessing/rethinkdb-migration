/*global describe, beforeEach, it*/

'use strict';

const RethinkConnectionParam = require('./../src/rethinkConnectionParams');
const expect = require('chai').expect;

describe('Rethink Connection Params', function () {
    let connectionObject;

    beforeEach(() => {
        connectionObject = {
            host: 'host',
            port: 'port',
            db: 'db',
            user: 'user',
            password: 'password'
        };
    });

    it('should return connection object', function () {
        // when
        let rethinkConnectionParam = new RethinkConnectionParam();
        rethinkConnectionParam
            .setHost(connectionObject.host)
            .setPort(connectionObject.port)
            .setDb(connectionObject.db)
            .setUser(connectionObject.user)
            .setPassword(connectionObject.password);

        // then
        expect(connectionObject).to.deep.equal(rethinkConnectionParam);
    });

    it('should return incomplete connection object', function () {
        // when
        let rethinkConnectionParam = new RethinkConnectionParam();
        rethinkConnectionParam
            .setPort(connectionObject.port)
            .setDb(connectionObject.db)
            .setUser(connectionObject.user)
            .setPassword(connectionObject.password);

        // then
        expect(connectionObject).to.deep.not.equal(rethinkConnectionParam);
    });
});
