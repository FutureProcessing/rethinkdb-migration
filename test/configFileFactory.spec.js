/*global describe, it */

'use strict';

const expect = require('chai').expect;
const factory = require('./../src/configFileFactory');

describe('Config file factory', () => {
    // when
    const Config = factory('./../test/config/config-test.json');

    // then
    it('Should return given db host', () => {
        expect(Config.getDbHost()).to.equal('test_host');
    });
    it('Should return given db port', () => {
        expect(Config.getDbPort()).to.equal('test_port');
    });
    it('Should return given db user', () => {
        expect(Config.getDbUser()).to.equal('test_user');
    });
    it('Should return given db pass', () => {
        expect(Config.getDbPass()).to.equal('test_pass');
    });
    it('Should return given db name', () => {
        expect(Config.getDbName()).to.equal('test_db_name');
    });
    it('Should return given db table', () => {
        expect(Config.getDbTable()).to.equal('test_db_table');
    });
    it('Should return given migrate directory', () => {
        expect(Config.getDirMigrate()).to.equal(process.cwd() + '/' + 'test_dir_migrate');
    });
    it('Should return given implementation directory', () => {
        expect(Config.getDirImplementation()).to.equal('test_dir_implementation');
    });
});
