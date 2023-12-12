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

describe('Test du service match', () => {
    beforeEach(() => {
        getMatches.mockClear();
        getEvents.mockClear();
    });

    it('Test de la methode getMatchEvents', async () => {
        getEvents.mockResolvedValue([
            { id: 1, matchID: 1, eventDate: '2012-12-31T11:30:45', homeScore: 0, awayScore: 0, status: "LIVE" },
            { id: 2, matchID: 1, eventDate: '2012-12-31T11:30:45', homeScore: 0, awayScore: 1, status: "LIVE" },
            { id: 3, matchID: 1, eventDate: '2012-12-31T11:30:45', homeScore: 1, awayScore: 1, status: "LIVE" },
            { id: 4, matchID: 2, eventDate: '2012-12-31T11:30:45', homeScore: 0, awayScore: 0, status: "LIVE" },
            { id: 5, matchID: 2, eventDate: '2012-12-31T11:30:45', homeScore: 1, awayScore: 0, status: "LIVE" },
            { id: 6, matchID: 1, eventDate: '2012-12-31T11:30:45', homeScore: 2, awayScore: 1, status: "LIVE" },
            { id: 7, matchID: 1, eventDate: '2012-12-31T11:30:45', homeScore: 2, awayScore: 1, status: "ENDED" },
        ])
    
        const events = await getMatchEvents(1);
        
        expect(events.length).toBe(5);
        expect(events[0].homeScore).toBe(0)
        expect(events[0].status).toBe("LIVE")
    });

    it('Test de la methode getAvailables', async () => {
        const now = new Date();
        var next = new Date(now);
        getMatches.mockResolvedValue([
            { id: 1, title: "Semi-final",    competitor1: 'Manchester City', competitor2: 'Liverpool FC',            startDate: next.setHours(now.getHours() - 1), endDate: next.setHours(now.getHours() + 1), homeTeamScore: 2,       awayTeamScore: 1 , status: "LIVE"},
            { id: 3, title: "Semi-final",    competitor1: 'Chelsea FC', competitor2: 'Liverpool FC',                 startDate: next.setHours(now.getHours() - 2), endDate: next.setHours(now.getHours() - 1), homeTeamScore: 0,       awayTeamScore: 2 , status: "ENDED"},
            { id: 4, title: "Semi-final",    competitor1: 'Arsenal FC', competitor2: 'Liverpool FC',                 startDate: next.setHours(now.getHours() - 2), endDate: next.setHours(now.getHours() - 1), homeTeamScore: 3,       awayTeamScore: 1 , status: "ENDED"},
            { id: 2, title: "Semi-final",    competitor1: 'Liverpool FC', competitor2: 'Chelsea FC',                 startDate: next.setHours(now.getHours() - 2), endDate: next.setHours(now.getHours() - 1), homeTeamScore: 1,       awayTeamScore: 1 , status: "ENDED"},
            { id: 5, title: "Semi-final",    competitor1: 'Tottenham Hotspur', competitor2: 'Liverpool FC',          startDate: next.setHours(now.getHours() - 2), endDate: next.setHours(now.getHours() - 1), homeTeamScore: 1,       awayTeamScore: 1 , status: "ENDED"},
            { id: 6, title: "Semi-final",    competitor1: 'Leicester City', competitor2: 'Liverpool FC',             startDate: next.setHours(now.getHours() - 2), endDate: next.setHours(now.getHours() - 1), homeTeamScore: 2,       awayTeamScore: 0 , status: "ENDED"},
            { id: 7, title: "Semi-final",    competitor1: 'Everton FC', competitor2: 'Liverpool FC',                 startDate: next.setHours(now.getHours() - 1), endDate: next.setHours(now.getHours() + 1), homeTeamScore: null,    awayTeamScore: null , status: "LIVE"},
            { id: 8, title: "Semi-final",    competitor1: 'West Ham United', competitor2: 'Liverpool FC',            startDate: next.setHours(now.getHours() - 1), endDate: next.setHours(now.getHours() + 1), homeTeamScore: null,    awayTeamScore: null , status: "LIVE"},
            { id: 9, title: "Semi-final",    competitor1: 'Wolverhampton Wanderers', competitor2: 'Liverpool FC',    startDate: next.setHours(now.getHours() - 1), endDate: next.setHours(now.getHours() + 1), homeTeamScore: null,    awayTeamScore: null , status: "LIVE"},
            { id: 10, title: "Semi-final",   competitor1: 'Newcastle United', competitor2: 'Liverpool FC',           startDate: next.setHours(now.getHours() - 1), endDate: next.setHours(now.getHours() + 1), homeTeamScore: null,    awayTeamScore: null , status: "LIVE"}
        ])
    
        const matches = await getAvailables();
        
        expect(matches.length).toBe(5);
        expect(matches[0].competitor1).toBe('Manchester City')
        expect(matches[0].status).toBe("LIVE")
    });
});