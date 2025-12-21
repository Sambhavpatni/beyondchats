
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

exports.rewriteArticle = async (original, ref1, ref2) => {
  const prompt = `Rewrite the article with improved formatting and SEO.`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  });

  return res.choices[0].message.content;
};
