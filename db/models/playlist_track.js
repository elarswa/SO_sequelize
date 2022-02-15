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
      playlist_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'playlist',
          key: 'id',
        },
      },
      track_id: {
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
      underscored: true,
    }
  );

  return playlist_track;
};
