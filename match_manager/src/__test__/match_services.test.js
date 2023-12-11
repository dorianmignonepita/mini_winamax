const {
    beginMatch,
    endMatch,
    getMatchById,
    updateMatchScore,
} = require('../services/match');

const {
    getMatches,
    updateMatch,
    addEvent,
} = require('../models/match');

const request = require('supertest');
jest.mock('../models/match', () => {
    return {
        getMatches: jest.fn(),
        updateMatch: jest.fn(),
        addEvent: jest.fn(),
    };}
)


const mockMatches = [
    {
        id: 1,
        competitor1: 'Manchester United',
        competitor2: 'Liverpool',
        homeScore: 0,
        awayScore: 0,
        status: 'NOT_STARTED',
    },
    {
        id: 2,
        competitor1: 'Manchester City',
        competitor2: 'Chelsea',
        homeScore: 0,
        awayScore: 0,
        status: 'NOT_STARTED',
    },
    {
        id: 3,
        competitor1: 'Arsenal',
        competitor2: 'Tottenham',
        homeScore: 0,
        awayScore: 0,
        status: 'LIVE',
    },
    {
        id: 4,
        competitor1: 'Barcelona',
        competitor2: 'Real Madrid',
        homeScore: 0,
        awayScore: 0,
        status: 'ENDED',
    },
];


describe('match services', () => {
    beforeEach(() => {
        getMatches.mockClear();
        updateMatch.mockClear();
        addEvent.mockClear();
    });

    it('should begin a match', async () => {
        getMatches.mockReturnValue(mockMatches);
        await beginMatch(1);
        expect(updateMatch).toHaveBeenCalledWith(1, "status='LIVE'");
        expect(addEvent).toHaveBeenCalledWith(1, 0, 0, 'LIVE');
    });

    it('should end a match', async () => {
        getMatches.mockReturnValue(mockMatches);
        await endMatch(1);
        expect(updateMatch).toHaveBeenCalledWith(1, "status='ENDED'");
        expect(addEvent).toHaveBeenCalledWith(1, 0, 0, 'ENDED');
    });

    it('should get a match by id', async () => {
        getMatches.mockReturnValue(mockMatches);
        const match = await getMatchById(1);
        expect(match).toEqual(mockMatches[0]);
    });

    it('should update home team score', async () => {
        getMatches.mockReturnValue(mockMatches);
        await updateMatchScore(1, 'Manchester United');
        expect(updateMatch).toHaveBeenCalledWith(1, "homeScore='1'");
        expect(addEvent).toHaveBeenCalledWith(1, 1, 0, 'LIVE');
    });

    it('should update away team score', async () => {
        getMatches.mockReturnValue(mockMatches);
        await updateMatchScore(1, 'Liverpool');
        expect(updateMatch).toHaveBeenCalledWith(1, "awayScore='1'");
        expect(addEvent).toHaveBeenCalledWith(1, 0, 1, 'LIVE');
    });
});
