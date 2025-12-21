
const axios = require('axios');
const cheerio = require('cheerio');

exports.scrapeArticle = async (url) => {
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  return $('article').text();
};
