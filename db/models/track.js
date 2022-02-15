module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define(
    'track',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
    },
    {
      tableName: 'track',
      timestamps: false,
      underscored: true,
    }
  );

  track.associate = models => {
    track.belongsTo(models.artist, {
      foreignKey: 'artist_id',
    });
    track.belongsTo(models.album, {
      foreignKey: 'album_id',
    });
    track.belongsToMany(models.playlist, {
      through: 'playlist_track',
    });
  };
  return track;
};
