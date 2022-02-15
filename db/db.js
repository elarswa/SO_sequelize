const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './Music.db',
  logging: false,
});
const db = {};

module.exports = db;

fs.readdirSync(`${__dirname}/models`)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(`${__dirname}/models`, file))(
      sequelize,
      Sequelize
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const seed = async () => {
  await Promise.all([
    db.artist.create({ name: 'artist1' }),
    db.artist.create({ name: 'artist2' }),
    db.album.create({ name: 'album1', artistId: 1 }),
    db.playlist.create({ name: 'playlist1' }),
  ]).catch(e => {});
  await Promise.all([
    db.track.create({ name: 'track1', artistId: 1, albumId: 1 }),
    db.track.create({ name: 'track2', artistId: 1, albumId: 1 }),
    db.playlist_track.create({ playlistId: 1, trackId: 1 }),
  ]).catch(e => {});
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize.sync({ force: true }).then(() => seed());
