module.exports = (sequelize, DataTypes) => {
  const playlist = sequelize.define(
    'playlist',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
    },
    {
      tableName: 'playlist',
      timestamps: false,
    }
  );

  playlist.associate = models => {
    playlist.belongsToMany(models.track, {
      through: models.playlist_track,
    });
    playlist.hasMany(models.playlist_track);
  };
  return playlist;
};
