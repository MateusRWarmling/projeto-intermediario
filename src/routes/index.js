const express = require("express");
const mangas = require('./mangas');
const routes = express.Router();

routes.use('/mangas', mangas);

module.exports = routes;
