const app = require('../src/app');
const {
    getMatches,
    addMatch,
    updateMatch,
    deleteMatch,
} = require('../src/models/match');
const request = require('supertest');

jest.mock('../src/models/match', () => {
    return {
        getMatches: jest.fn(),
        addMatch: jest.fn(),
        updateMatch: jest.fn(),
        deleteMatch: jest.fn(),
    };
});

describe('Upcoming', () => {
    beforeEach(() => {
        getMatches.mockClear();
        addMatch.mockClear();
        updateMatch.mockClear();
        deleteMatch.mockClear();
    });

    it('should be 4 matches', async () => {
        getMatches.mockResolvedValue(
            [
                { id: 1, opponent: 'Manchester City', date: '2023-08-15', homeTeamScore: 2, awayTeamScore: 1 },
                { id: 2, opponent: 'Liverpool FC', date: '2023-08-22', homeTeamScore: 1, awayTeamScore: 1 },
                { id: 3, opponent: 'Chelsea FC', date: '2023-08-29', homeTeamScore: 0, awayTeamScore: 2 },
                { id: 4, opponent: 'Arsenal FC', date: '2023-09-05', homeTeamScore: 3, awayTeamScore: 1 },
                { id: 5, opponent: 'Tottenham Hotspur', date: '2023-09-12', homeTeamScore: 1, awayTeamScore: 1 },
                { id: 6, opponent: 'Leicester City', date: '2023-09-19', homeTeamScore: 2, awayTeamScore: 0 },
                { id: 7, opponent: 'Everton FC', date: '2023-09-26', homeTeamScore: null, awayTeamScore: null },
                { id: 8, opponent: 'West Ham United', date: '2023-10-03', homeTeamScore: null, awayTeamScore: null },
                { id: 9, opponent: 'Wolverhampton Wanderers', date: '2023-10-10', homeTeamScore: null, awayTeamScore: null },
                { id: 10, opponent: 'Newcastle United', date: '2023-10-17', homeTeamScore: null, awayTeamScore: null }
            ]
        );

        const res = await request(app).get(`/matches/upcoming`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(4);
        res.body.map(elem => expect(elem.homeTeamScore === null && elem.awayTeamScore === null));
    });

    it('should be none', async () => {
        getMatches.mockResolvedValue([]);

        const res = await request(app).get(`/matches/upcoming`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(0);
    });

    it('should be 1 match', async () => {
        getMatches.mockResolvedValue(
            [
                { id: 7, opponent: 'Everton FC', date: '2023-09-26', homeTeamScore: null, awayTeamScore: null },
            ]
        );

        const res = await request(app).get(`/matches/upcoming`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].id).toEqual(7);
    });
});


describe('Get match results', () => {
    beforeEach(() => {
        getMatches.mockClear();
        addMatch.mockClear();
        updateMatch.mockClear();
        deleteMatch.mockClear();
    });

    it('should be 4 matches', async () => {
        getMatches.mockResolvedValue(
            [
                { id: 1, opponent: 'Manchester City', date: '2023-08-15', homeTeamScore: 2, awayTeamScore: 1 },
                { id: 2, opponent: 'Liverpool FC', date: '2023-08-22', homeTeamScore: 1, awayTeamScore: 1 },
                { id: 3, opponent: 'Chelsea FC', date: '2023-08-29', homeTeamScore: 0, awayTeamScore: 2 },
                { id: 4, opponent: 'Arsenal FC', date: '2023-09-05', homeTeamScore: 3, awayTeamScore: 1 },
                { id: 5, opponent: 'Tottenham Hotspur', date: '2023-09-12', homeTeamScore: 1, awayTeamScore: 1 },
                { id: 6, opponent: 'Leicester City', date: '2023-09-19', homeTeamScore: 2, awayTeamScore: 0 },
                { id: 7, opponent: 'Everton FC', date: '2023-09-26', homeTeamScore: null, awayTeamScore: null },
                { id: 8, opponent: 'West Ham United', date: '2023-10-03', homeTeamScore: null, awayTeamScore: null },
                { id: 9, opponent: 'Wolverhampton Wanderers', date: '2023-10-10', homeTeamScore: null, awayTeamScore: null },
                { id: 10, opponent: 'Newcastle United', date: '2023-10-17', homeTeamScore: null, awayTeamScore: null }
            ]
        );

        const res = await request(app).get(`/matches/results`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(6);
        res.body.map(elem => expect(elem.results === elem.homeTeamScore > elem.awayTeamScore ? "Gain" : elem.homeTeamScore === elem.awayTeamScore ? "Match Nul" : "Défaite"));
    });

    it('should be none', async () => {
        getMatches.mockResolvedValue([]);

        const res = await request(app).get(`/matches/results`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(0);
    });

    it('should be none because nothing match', async () => {
        getMatches.mockResolvedValue([
            { id: 7, opponent: 'Everton FC', date: '2023-09-26', homeTeamScore: null, awayTeamScore: null },
                { id: 8, opponent: 'West Ham United', date: '2023-10-03', homeTeamScore: null, awayTeamScore: null },
                { id: 9, opponent: 'Wolverhampton Wanderers', date: '2023-10-10', homeTeamScore: null, awayTeamScore: null },
                { id: 10, opponent: 'Newcastle United', date: '2023-10-17', homeTeamScore: null, awayTeamScore: null }
        ]);

        const res = await request(app).get(`/matches/results`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(0);
    });

    it('should be 1 matches', async () => {
        getMatches.mockResolvedValue(
            [
                { id: 1, opponent: 'Manchester City', date: '2023-08-15', homeTeamScore: 2, awayTeamScore: 1 },
            ]
        );

        const res = await request(app).get(`/matches/results`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].result).toEqual("Gain");
    });
});

describe('Get matches score', () => {
    beforeEach(() => {
        getMatches.mockClear();
        addMatch.mockClear();
        updateMatch.mockClear();
        deleteMatch.mockClear();
    });

    it('should be 3 matches', async () => {
        getMatches.mockResolvedValue(
            [
                { id: 1, opponent: 'Manchester City', date: '2023-08-15', homeTeamScore: 3, awayTeamScore: 3 },
                { id: 2, opponent: 'Liverpool FC', date: '2023-08-22', homeTeamScore: 3, awayTeamScore: 3 },
                { id: 3, opponent: 'Chelsea FC', date: '2023-08-29', homeTeamScore: 0, awayTeamScore: 2 },
                { id: 4, opponent: 'Arsenal FC', date: '2023-09-05', homeTeamScore: 3, awayTeamScore: 3 },
                { id: 5, opponent: 'Tottenham Hotspur', date: '2023-09-12', homeTeamScore: 1, awayTeamScore: 1 },
                { id: 6, opponent: 'Leicester City', date: '2023-09-19', homeTeamScore: 2, awayTeamScore: 0 },
                { id: 7, opponent: 'Everton FC', date: '2023-09-26', homeTeamScore: null, awayTeamScore: null },
                { id: 8, opponent: 'West Ham United', date: '2023-10-03', homeTeamScore: null, awayTeamScore: null },
                { id: 9, opponent: 'Wolverhampton Wanderers', date: '2023-10-10', homeTeamScore: null, awayTeamScore: null },
                { id: 10, opponent: 'Newcastle United', date: '2023-10-17', homeTeamScore: null, awayTeamScore: null }
            ]
        );

        const res = await request(app).get(`/matches/score/3-3`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
        expect(res.body[0].id).toEqual(1);
        expect(res.body[1].id).toEqual(2);
        expect(res.body[2].id).toEqual(4);
    });

    it('should be 0 matches', async () => {
        getMatches.mockResolvedValue([]);

        const res = await request(app).get(`/matches/score/3-3`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(0);
    });

    it('should be 1 match', async () => {
        getMatches.mockResolvedValue([
            { id: 1, opponent: 'Manchester City', date: '2023-08-15', homeTeamScore: 2, awayTeamScore: 1 },
            { id: 2, opponent: 'Liverpool FC', date: '2023-08-22', homeTeamScore: 1, awayTeamScore: 1 },
            { id: 3, opponent: 'Chelsea FC', date: '2023-08-29', homeTeamScore: 0, awayTeamScore: 2 },
            { id: 4, opponent: 'Arsenal FC', date: '2023-09-05', homeTeamScore: 3, awayTeamScore: 3 },
            { id: 5, opponent: 'Tottenham Hotspur', date: '2023-09-12', homeTeamScore: 1, awayTeamScore: 1 },
            { id: 6, opponent: 'Leicester City', date: '2023-09-19', homeTeamScore: 2, awayTeamScore: 0 },
            { id: 7, opponent: 'Everton FC', date: '2023-09-26', homeTeamScore: null, awayTeamScore: null },
            { id: 8, opponent: 'West Ham United', date: '2023-10-03', homeTeamScore: null, awayTeamScore: null },
            { id: 9, opponent: 'Wolverhampton Wanderers', date: '2023-10-10', homeTeamScore: null, awayTeamScore: null },
            { id: 10, opponent: 'Newcastle United', date: '2023-10-17', homeTeamScore: null, awayTeamScore: null }
        ]);

        const res = await request(app).get(`/matches/score/3-3`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].id).toEqual(4);
    });

    it('should be none because nothing match', async () => {
        getMatches.mockResolvedValue(
            [
                { id: 1, opponent: 'Manchester City', date: '2023-08-15', homeTeamScore: 2, awayTeamScore: 1 },
                { id: 2, opponent: 'Liverpool FC', date: '2023-08-22', homeTeamScore: 1, awayTeamScore: 1 },
                { id: 3, opponent: 'Chelsea FC', date: '2023-08-29', homeTeamScore: 0, awayTeamScore: 2 },
                { id: 4, opponent: 'Arsenal FC', date: '2023-09-05', homeTeamScore: 3, awayTeamScore: 3 },
                { id: 5, opponent: 'Tottenham Hotspur', date: '2023-09-12', homeTeamScore: 1, awayTeamScore: 1 },
                { id: 6, opponent: 'Leicester City', date: '2023-09-19', homeTeamScore: 2, awayTeamScore: 0 },
                { id: 7, opponent: 'Everton FC', date: '2023-09-26', homeTeamScore: null, awayTeamScore: null },
                { id: 8, opponent: 'West Ham United', date: '2023-10-03', homeTeamScore: null, awayTeamScore: null },
                { id: 9, opponent: 'Wolverhampton Wanderers', date: '2023-10-10', homeTeamScore: null, awayTeamScore: null },
            { id: 10, opponent: 'Newcastle United', date: '2023-10-17', homeTeamScore: null, awayTeamScore: null }
            ]
        );

        const res = await request(app).get(`/matches/score/5-2`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(0);
    });
});