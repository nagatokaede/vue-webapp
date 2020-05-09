'use static';

const fs = require('fs');

const returnHome = (homePageFile) => {
  return async (ctx , next) => {
    try {
      const content = await fs.readFileSync(homePageFile, 'utf-8');
      ctx.set('Content-Type', 'text/html; charset=utf-8');
      ctx.body = content;
    } catch (err) {
      console.log('We cannot open "index.htm" file.');
    }
    
    await next();
  };
};

module.exports = returnHome;
