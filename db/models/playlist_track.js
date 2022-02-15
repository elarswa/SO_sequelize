module.exports = (sequelize, DataTypes) => {
  const playlist_track = sequelize.define(
    'playlist_track',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      playlistId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'playlist',
          key: 'id',
        },
      },
      trackId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'track',
          key: 'id',
        },
      },
    },
    {
      tableName: 'playlist_track',
      timestamps: false,
    }
  );

  return playlist_track;
};
