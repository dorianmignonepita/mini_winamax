const express = require('express');
const router = express.Router();

const db = require("../loaders/mySql");
const { getUsers, addFavorite, deleteFavorite } = require('../models/user');
const { getUserFavorites } = require('../services/user');

router.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id/favorites', async (req, res) => {
    try {
        const favorites = await getUserFavorites(req.params.id);
        res.status(200).send(favorites);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/:id/favorites', async (req, res) => {
    try {
        const {matchID} = req.body;
        await addFavorite(req.params.id, matchID);
        res.status(201).send({});
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id/favorites/:favId', async (req, res) => {
    try {
        await deleteFavorite(req.params.favId);
        res.status(204).send({});
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;