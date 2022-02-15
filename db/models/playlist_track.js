module.exports = (sequelize, DataTypes) => {
  const playlist_track = sequelize.define(
    'playlist_track',
    {},
    {
      tableName: 'playlist_track',
      timestamps: false,
      underscored: true,
    }
  );

  return playlist_track;
};
