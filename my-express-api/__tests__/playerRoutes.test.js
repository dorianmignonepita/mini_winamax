const app = require('../src/app');
const {
    getPlayers,
    addPlayer,
    updatePlayer,
    deletePlayer,
} = require('../src/models/player');
const request = require('supertest');

jest.mock('../src/models/player', () => {
    return {
        getPlayers: jest.fn(),
        addPlayer: jest.fn(),
        updatePlayer: jest.fn(),
        deletePlayer: jest.fn(),
    };
});

describe('Top Scorers', () => {
    beforeEach(() => {
        getPlayers.mockClear();
        addPlayer.mockClear();
        updatePlayer.mockClear();
        deletePlayer.mockClear();
    });

    it('should be 3 players', async () => {
        getPlayers.mockResolvedValue(
            [
                { id: 1, name: 'Jamie Tartt', position: 'Forward', number: 9, goalsScored: 12, assists: 5 },
                { id: 2, name: 'Roy Kent', position: 'Midfielder', number: 6, goalsScored: 3, assists: 4 },
                { id: 3, name: 'Sam Obisanya', position: 'Defender', number: 26, goalsScored: 2, assists: 2 },
                { id: 4, name: 'Dani Rojas', position: 'Forward', number: 10, goalsScored: 14, assists: 6 },
                { id: 5, name: 'Isaac McAdoo', position: 'Defender', number: 4, goalsScored: 1, assists: 1 },
                { id: 6, name: 'Colin Hughes', position: 'Midfielder', number: 8, goalsScored: 4, assists: 5 },
                { id: 7, name: 'Richard Montlaur', position: 'Midfielder', number: 14, goalsScored: 3, assists: 3 },
                { id: 8, name: 'Jan Maas', position: 'Defender', number: 5, goalsScored: 2, assists: 2 },
                { id: 9, name: 'Thierry Zoreaux', position: 'Goalkeeper', number: 1, goalsScored: 0, assists: 0 },
                { id: 10, name: 'Moe Bumbercatch', position: 'Defender', number: 15, goalsScored: 1, assists: 2 }
            ]
        );

        const res = await request(app).get(`/players/topScorers`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
        expect(res.body[0].id).toEqual(4);
        expect(res.body[1].id).toEqual(1);
        expect(res.body[2].id).toEqual(6);
    });

    it('should be none', async () => {
        getPlayers.mockResolvedValue([]);

        const res = await request(app).get(`/players/topScorers`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(0);
    });

    it('should be 1 players', async () => {
        getPlayers.mockResolvedValue(
            [
                { id: 1, name: 'Jamie Tartt', position: 'Forward', number: 9, goalsScored: 12, assists: 5 },
            ]
        );

        const res = await request(app).get(`/players/topScorers`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].id).toEqual(1);
    });
});


describe('Get position players', () => {
    beforeEach(() => {
        getPlayers.mockClear();
        addPlayer.mockClear();
        updatePlayer.mockClear();
        deletePlayer.mockClear();
    });

    it('should be 4 players', async () => {
        getPlayers.mockResolvedValue(
            [
                { id: 1, name: 'Jamie Tartt', position: 'Forward', number: 9, goalsScored: 12, assists: 5 },
                { id: 2, name: 'Roy Kent', position: 'Midfielder', number: 6, goalsScored: 3, assists: 4 },
                { id: 3, name: 'Sam Obisanya', position: 'Defender', number: 26, goalsScored: 2, assists: 2 },
                { id: 4, name: 'Dani Rojas', position: 'Forward', number: 10, goalsScored: 14, assists: 6 },
                { id: 5, name: 'Isaac McAdoo', position: 'Defender', number: 4, goalsScored: 1, assists: 1 },
                { id: 6, name: 'Colin Hughes', position: 'Midfielder', number: 8, goalsScored: 4, assists: 5 },
                { id: 7, name: 'Richard Montlaur', position: 'Midfielder', number: 14, goalsScored: 3, assists: 3 },
                { id: 8, name: 'Jan Maas', position: 'Defender', number: 5, goalsScored: 2, assists: 2 },
                { id: 9, name: 'Thierry Zoreaux', position: 'Goalkeeper', number: 1, goalsScored: 0, assists: 0 },
                { id: 10, name: 'Moe Bumbercatch', position: 'Defender', number: 15, goalsScored: 1, assists: 2 }
            ]
        );

        const res = await request(app).get(`/players/position/Defender`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(4);
        res.body.map(elem => expect(elem.position === "Defender"));
    });

    it('should be none', async () => {
        getPlayers.mockResolvedValue([]);

        const res = await request(app).get(`/players/position/Defender`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(0);
    });

    it('should be none because nothing match', async () => {
        getPlayers.mockResolvedValue([
            { id: 1, name: 'Jamie Tartt', position: 'Forward', number: 9, goalsScored: 12, assists: 5 },
            { id: 2, name: 'Roy Kent', position: 'Midfielder', number: 6, goalsScored: 3, assists: 4 },
            { id: 3, name: 'Sam Obisanya', position: 'Defender', number: 26, goalsScored: 2, assists: 2 },
            { id: 4, name: 'Dani Rojas', position: 'Forward', number: 10, goalsScored: 14, assists: 6 },
            { id: 5, name: 'Isaac McAdoo', position: 'Defender', number: 4, goalsScored: 1, assists: 1 },
            { id: 6, name: 'Colin Hughes', position: 'Midfielder', number: 8, goalsScored: 4, assists: 5 },
            { id: 7, name: 'Richard Montlaur', position: 'Midfielder', number: 14, goalsScored: 3, assists: 3 },
            { id: 8, name: 'Jan Maas', position: 'Defender', number: 5, goalsScored: 2, assists: 2 },
            { id: 9, name: 'Thierry Zoreaux', position: 'Goalkeeper', number: 1, goalsScored: 0, assists: 0 },
            { id: 10, name: 'Moe Bumbercatch', position: 'Defender', number: 15, goalsScored: 1, assists: 2 }
        ]);

        const res = await request(app).get(`/players/position/dog`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(0);
    });

    it('should be 1 players', async () => {
        getPlayers.mockResolvedValue(
            [
                { id: 10, name: 'Moe Bumbercatch', position: 'Defender', number: 15, goalsScored: 1, assists: 2 }
            ]
        );

        const res = await request(app).get(`/players/position/Defender`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].id).toEqual(10);
    });
});

describe('Get aggregate stats', () => {
    beforeEach(() => {
        getPlayers.mockClear();
        addPlayer.mockClear();
        updatePlayer.mockClear();
        deletePlayer.mockClear();
    });

    it('should be 42 goals and 30 assists', async () => {
        getPlayers.mockResolvedValue(
            [
                { id: 1, name: 'Jamie Tartt', position: 'Forward', number: 9, goalsScored: 12, assists: 5 },
                { id: 2, name: 'Roy Kent', position: 'Midfielder', number: 6, goalsScored: 3, assists: 4 },
                { id: 3, name: 'Sam Obisanya', position: 'Defender', number: 26, goalsScored: 2, assists: 2 },
                { id: 4, name: 'Dani Rojas', position: 'Forward', number: 10, goalsScored: 14, assists: 6 },
                { id: 5, name: 'Isaac McAdoo', position: 'Defender', number: 4, goalsScored: 1, assists: 1 },
                { id: 6, name: 'Colin Hughes', position: 'Midfielder', number: 8, goalsScored: 4, assists: 5 },
                { id: 7, name: 'Richard Montlaur', position: 'Midfielder', number: 14, goalsScored: 3, assists: 3 },
                { id: 8, name: 'Jan Maas', position: 'Defender', number: 5, goalsScored: 2, assists: 2 },
                { id: 9, name: 'Thierry Zoreaux', position: 'Goalkeeper', number: 1, goalsScored: 0, assists: 0 },
                { id: 10, name: 'Moe Bumbercatch', position: 'Defender', number: 15, goalsScored: 1, assists: 2 }
            ]
        );

        const res = await request(app).get(`/players/stats`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.goals).toEqual(42);
        expect(res.body.assists).toEqual(30);
    });

    it('should be 0 goals and 0 assists because no players', async () => {
        getPlayers.mockResolvedValue([]);

        const res = await request(app).get(`/players/stats`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.goals).toEqual(0);
        expect(res.body.assists).toEqual(0);
    });

    it('should be 17 goals and 11 assists', async () => {
        getPlayers.mockResolvedValue([
            { id: 1, name: 'Jamie Tartt', position: 'Forward', number: 9, goalsScored: 12, assists: 5 },
            { id: 2, name: 'Roy Kent', position: 'Midfielder', number: 6, goalsScored: 3, assists: 4 },
            { id: 3, name: 'Sam Obisanya', position: 'Defender', number: 26, goalsScored: 2, assists: 2 },
        ]);

        const res = await request(app).get(`/players/stats`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.goals).toEqual(17);
        expect(res.body.assists).toEqual(11);
    });

    it('should be 1 goal and 2 assists', async () => {
        getPlayers.mockResolvedValue(
            [
                { id: 10, name: 'Moe Bumbercatch', position: 'Defender', number: 15, goalsScored: 1, assists: 2 }
            ]
        );

        const res = await request(app).get(`/players/stats`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.goals).toEqual(1);
        expect(res.body.assists).toEqual(2);
    });
});