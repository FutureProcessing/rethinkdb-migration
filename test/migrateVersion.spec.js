/*global describe*/

'use strict';

const MigrateVersion = require('./../src/migrateVersion');
const expect = require('chai').expect;
const itParam = require('mocha-param').itParam;
const REGEX_VERSION = /\d+_\d+/;

// given
const expectedVersion = [
    { version: '0_0', result: '0_0' },
    { version: '1_0', result: '1_0' },
    { version: '0_1', result: '0_1' },
    { version: '1_1', result: '1_1' },
    { version: '0_999', result: '0_999' },
    { version: '10000_999', result: '10000_999' }
];
const expectedParsed = [
    { version: null, result: 0 },
    { version: '0_0', result: 0 },
    { version: '1_0', result: 10 },
    { version: '0_1', result: 1 },
    { version: '1_1', result: 11 },
    { version: '0_999', result: 999 },
    { version: '10000_999', result: 10000999 }
];
const expectedStringVersion = [
    { filename: '0_0-test', result: '0_0' },
    { filename: '10000_999-test-test', result: '10000_999' }
];

const expectedComparisonState = [
    { version: '0_0', filename: '0_0-test', result: 0 },
    { version: '0_1', filename: '0_1-test-test', result: 0 },
    { version: '1_1', filename: '1_1-test-test', result: 0 },
    { version: '1_1', filename: '1_2-test-test', result: 1 },
    { version: '2_1', filename: '2_2-test-test', result: 1 },
    { version: '2_1', filename: '1_1-test-test', result: -1 },
    { version: '2_1', filename: '1_2-test-test', result: -1 }
];

describe('Migrate version', () => {
    itParam('Should return given migrate version', expectedVersion, (assertion) => {
        // when
        let migrateVersion = new MigrateVersion(assertion.version, REGEX_VERSION);
        // then
        expect(migrateVersion.getVersion()).to.equal(assertion.result);
    });
    itParam('Should return parsed version from string', expectedParsed, (assertion) => {
        // when
        let migrateVersion = new MigrateVersion('123_456', REGEX_VERSION);
        // then
        expect(migrateVersion.getParsedVersionFromString(assertion.version)).to.equal(assertion.result);
    });
    itParam('Should return version from string', expectedStringVersion, (assertion) => {
        // when
        let migrateVersion = new MigrateVersion('123_456', REGEX_VERSION);
        // then
        expect(migrateVersion.getVersionFromString(assertion.filename)).to.equal(assertion.result);
    });
    itParam('Should return comparison state', expectedComparisonState, (assertion) => {
        // when
        let migrateVersion = new MigrateVersion(assertion.version, REGEX_VERSION);
        // then
        expect(migrateVersion.compare(assertion.filename)).to.equal(assertion.result);
    });
});
