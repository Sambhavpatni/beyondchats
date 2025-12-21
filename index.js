
require('dotenv').config();
const axios = require('axios');
const { searchGoogle } = require('./googleSearch');
const { scrapeArticle } = require('./scraper');
const { rewriteArticle } = require('./llm');

(async () => {
  const res = await axios.get('http://localhost:8000/api/articles');
  const article = res.data[0];

  const links = await searchGoogle(article.title);
  const ref1 = await scrapeArticle(links[0]);
  const ref2 = await scrapeArticle(links[1]);

  const updated = await rewriteArticle(article.content, ref1, ref2);

  await axios.post('http://localhost:8000/api/articles', {
    title: article.title + ' (Updated)',
    content: updated + `
      <h3>References</h3>
      <ul>
        <li>${links[0]}</li>
        <li>${links[1]}</li>
      </ul>`,
    type: 'updated',
    references: links
  });

  console.log('Updated article published');
})();
