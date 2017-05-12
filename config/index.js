const Path = require('path');

const bitlyConfig = require('./bitly');

module.exports = {
  paths: {
    image: Path.join(__dirname, '/../tmp/'),
  },
  bitly: bitlyConfig
};
