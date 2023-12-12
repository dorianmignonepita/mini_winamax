const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/loaders/mySql');
const { getUsers, getFavorites, addFavorite, deleteFavorite } = require('../../src/models/user')

jest.mock('../../src/models/user', () => {
    return {
        getUsers: jest.fn(),
        getFavorites: jest.fn(),
        addFavorite: jest.fn(),
        deleteFavorite: jest.fn(),
    };
});

jest.mock('../../src/loaders/mySql', () => ({
    query: jest.fn(),
  }));

describe('Test des routes user', () => {
    beforeEach(() => {
        getUsers.mockClear();
        getFavorites.mockClear();
        addFavorite.mockClear();
        deleteFavorite.mockClear();
        db.query.mockClear();
    });

    it('Test de la route get /users', async () => {
        getUsers.mockResolvedValue([
            { id: 1,    name: 'Jamie Tartt'},
            { id: 2,    name: 'Roy Kent'},
            { id: 3,    name: 'Sam Obisanya'},
            { id: 4,    name: 'Dani Rojas'},
            { id: 5,    name: 'Moe Bumbercatch'}
        ]);

        const response = await request(app).get(`/users`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(5);
    });

    it('Test de la route get /users/:id/favorites', async () => {
        getFavorites.mockResolvedValue([
            { id: 1,    userID: 1, matchID: 1},
            { id: 2,    userID: 1, matchID: 2},
            { id: 3,    userID: 2, matchID: 1},
        ])

        const response = await request(app).get(`/users/1/favorites`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(2);
    });
});