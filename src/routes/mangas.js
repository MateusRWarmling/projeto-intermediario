/* eslint-disable no-undef */
const express = require("express");
const axios = require('axios').default;
const parse = require('node-html-parser').parse;

const route = express.Router();

const PAGE_ULR = 'https://myanimelist.net/topmanga.php';

route.get('/', async (req, res) => {
  const query = req.query.title ? String(req.query.title) : false;

  const mangaList = [];

  const { data } = await axios.get(PAGE_ULR);
  const root = parse(data);
  const mangasFound = root.querySelectorAll('.ranking-list');

  mangasFound.map(manga => {
    const title = manga.querySelector('.manga_h3 a').innerHTML;
    const rank = manga.querySelector('.top-anime-rank-text').innerHTML;
    const score = manga.querySelector('.score-label').innerHTML;

    const mangaData = {
      title,
      rank,
      score,
      timestamp: new Date(),
    };

    if (!query) {
      mangaList.push(mangaData);
    } else if (mangaData.title.toUpperCase().includes(query.toUpperCase())) {
      mangaList.push(mangaData);
    }

    return null;
  });

  res.json(mangaList);
});

module.exports = route;
