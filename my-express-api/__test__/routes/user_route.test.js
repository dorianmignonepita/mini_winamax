const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/loaders/mySql');
const {getMatches, getEvents } = require('../../src/models/match')
const { getMatchEvents, getAvailables } = require('../../src/services/match');

jest.mock('../../src/models/match', () => {
    return {
        getMatches: jest.fn(),
        getEvents: jest.fn(),
    };
});