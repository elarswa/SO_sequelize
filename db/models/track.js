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
      allowNull: false,
    });
    track.belongsTo(models.album, {
      foreignKey: 'album_id',
      allowNull: true,
    });
    track.belongsToMany(models.playlist, {
      through: 'playlist_track',
    });
    track.hasMany(models.playlist_track);
  };
  return track;
};
