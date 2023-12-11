const request = require('supertest');
const app = require('../src/app');
const db = require('../src/loaders/mySql');
const {getUsers, getFavorites, addFavorite, deleteFavorite } = require('../src/models/user')
const { getUserFavorites } = require('../src/services/user');

jest.mock('../src/models/user', () => {
    return {
        getUsers: jest.fn(),
        getFavorites: jest.fn(),
        addFavorite: jest.fn(),
        deleteFavorite: jest.fn(),
    };
});

describe('Test du service user', () => {
    beforeEach(() => {
        getUsers.mockClear();
        getFavorites.mockClear();
        addFavorite.mockClear();
        deleteFavorite.mockClear();
    });

    it('Test de la methode getUserFavorites', async () => {
        getFavorites.mockResolvedValue([
            { id: 1,    userID: 1, matchID: 1},
            { id: 2,    userID: 1, matchID: 2},
            { id: 3,    userID: 2, matchID: 1},
        ])
    
        const favorites = await getUserFavorites(1);
        
        expect(favorites.length).toBe(2);
        expect(favorites[0].userID).toBe(1)
        expect(favorites[0].matchID).toBe(1)
    });
});