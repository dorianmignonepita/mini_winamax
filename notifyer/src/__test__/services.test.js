const db = require('../loaders/mySql');


const {
    getNotStartedMatches,
    getNotEndedMatches,
    getLiveMatches
} = require('../services/matchServiceImpl')



const {
    getMatches,
    getEvents,
} = require('../models/match')


const request = require('supertest');


jest.mock('../models/match', () => {
    return {
        getMatches: jest.fn(),
        getEvents: jest.fn(),
    };
});

const mockUsers = [
    { id: 1,    name: 'Jamie Tartt'},
    { id: 2,    name: 'Roy Kent'},
    { id: 3,    name: 'Sam Obisanya'},
    { id: 4,    name: 'Dani Rojas'},
    { id: 5,    name: 'Moe Bumbercatch'}
];

const today = new Date();
const endMatch = new Date(today);
endMatch.setHours(endMatch.getHours() + 1);

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const tomorrowEndMatch = new Date(tomorrow);
tomorrowEndMatch.setHours(tomorrowEndMatch.getHours() + 1);

const mockMatches = [
    {title:'Semi-final', competitor1:'Liverpool', competitor2:'Manchester', startDate:'2012-12-31T11:30:45', endDate:'2012-12-31T12:30:45', homeTeamScore:2, awayTeamScore:1, status:'ENDED'},
    {title:'Semi-final', competitor1:'PSG', competitor2:'FC Strasbourg', startDate:'2012-12-31T11:30:45', endDate:'2012-12-31T12:30:45', homeTeamScore:0, awayTeamScore:3, status:'LIVE'},
    {title:'Quarter-final', competitor1:'FC Dijon', competitor2:'FC Lyon', startDate:today, endDate:endMatch, homeTeamScore:0, awayTeamScore:0, status:'LIVE'},
    {title:'Quarter-final', competitor1:'FC Marseille', competitor2:'FC Nantes', startDate:today, endDate:endMatch, homeTeamScore:0, awayTeamScore:0, status:'PREMATCH'},
    {title:'Eighth-final', competitor1:'FC Lille', competitor2:'FC Brest', startDate:tomorrow, endDate:tomorrowEndMatch, homeTeamScore:0, awayTeamScore:0, status:'PREMATCH'},
]


describe('Test Suite - Notifyer : Services', () => {
    beforeEach(() => {
        getMatches.mockClear();
    });

    
    it('Expect to get only Marseille vs Nantes', async () => {
        getMatches.mockResolvedValue(mockMatches)

        const expectedOutput = [
            {title:'Quarter-final', competitor1:'FC Marseille', competitor2:'FC Nantes', startDate:today, endDate:endMatch, homeTeamScore:0, awayTeamScore:0, status:'PREMATCH'},
        ]

        const response = await getNotStartedMatches()

        expect(response).toStrictEqual(expectedOutput)
    })



    it('Expect to get only PSG vs Strasbourg', async () => {
        getMatches.mockResolvedValue(mockMatches)

        const expectedOutput = [
            {title:'Semi-final', competitor1:'PSG', competitor2:'FC Strasbourg', startDate:'2012-12-31T11:30:45', endDate:'2012-12-31T12:30:45', homeTeamScore:0, awayTeamScore:3, status:'LIVE'},
        ]

        const response = await getNotEndedMatches()

        expect(response).toStrictEqual(expectedOutput)
    })

    it('Expect to get only PSG vs Strasbourg and Dijon vs Lyon', async () => {
        
        getMatches.mockResolvedValue(mockMatches)

        const expectedOutput = [
            {title:'Semi-final', competitor1:'PSG', competitor2:'FC Strasbourg', startDate:'2012-12-31T11:30:45', endDate:'2012-12-31T12:30:45', homeTeamScore:0, awayTeamScore:3, status:'LIVE'},
            {title:'Quarter-final', competitor1:'FC Dijon', competitor2:'FC Lyon', startDate:today, endDate:endMatch, homeTeamScore:0, awayTeamScore:0, status:'LIVE'},
        ]

        const response = await getLiveMatches()

        expect(response).toStrictEqual(expectedOutput)
    })
})






