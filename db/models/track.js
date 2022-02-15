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
    }
  );

  track.associate = models => {
    track.belongsTo(models.artist, {
      foreignKey: 'artistId',
      allowNull: false,
    });
    track.belongsTo(models.album, {
      foreignKey: 'albumId',
      allowNull: true,
    });
    track.belongsToMany(models.playlist, {
      through: 'playlist_track',
    });
    track.hasMany(models.playlist_track);
  };
  return track;
};
