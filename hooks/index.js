const { parseFile } = require('./message');

const { HUSKY_GIT_PARAMS, HUSKY_GIT_STDIN } = process.env;

console.log('Git params: ', HUSKY_GIT_PARAMS);
console.log('Git stdin: ', HUSKY_GIT_STDIN);

(async arg => {
  const action = arg.split('=').pop();

  switch (action) {
    case 'message':
      await parseFile(HUSKY_GIT_PARAMS);
      break;

    default:
  }
})(process.argv.slice(2)[0]);
