"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transform = (dataStr, key, filePath, process) => new Promise((resolve, reject) => {
  let dataString = dataStr;
  const refMatches = dataString.match(/{"\$ref":"(.*?)"}/g);

  const baseDir = _path.default.dirname(filePath);

  if (refMatches && refMatches.length > 0) {
    const refFileList = [];
    refMatches.forEach(matchKey => {
      const refFile = matchKey.match(/{"\$ref":"(.*)"}/)[1];

      const refFilePath = _path.default.resolve(`${baseDir}/${refFile}`);

      refFileList.push(process(refFilePath, matchKey));
    });
    return Promise.all(refFileList).then(results => {
      const mergeMatches = dataString.match(/{"\$merge":\[(.*?)\]}/g);

      if (mergeMatches && mergeMatches.length > 0) {
        mergeMatches.forEach(mergeMatchKey => {
          const localMatches = [];
          const localRefMatches = mergeMatchKey.match(/{"\$ref":"(.*?)"}/g);

          if (!localRefMatches || localRefMatches.length === 0) {
            reject(new Error('Malformed merge setting, please check the input file.'));
            return;
          }

          localRefMatches.forEach(refMatchKey => {
            const j = results.length;

            for (let i = 0; i < j; i += 1) {
              const result = results[i];

              if (result.key === refMatchKey) {
                const end = result.dataString.length - 2;
                localMatches.push(result.dataString.substr(1, end));
                break;
              }
            }
          });
          const localMatchesStr = `{${localMatches.join(',')}}`;
          dataString = dataString.replace(mergeMatchKey, localMatchesStr);
        });
      } else {
        results.forEach(result => {
          dataString = dataString.replace(result.key, result.dataString);
        });
      }

      return resolve({
        dataString,
        key
      });
    });
  }

  const mergeMatches = dataString.match(/{"\$merge":\[(.*?)\]}/g);

  if (mergeMatches && mergeMatches.length > 0) {
    return reject(new Error('Malformed merge setting, please check the input file.'));
  }

  return resolve({
    dataString,
    key
  });
});

var _default = transform;
exports.default = _default;