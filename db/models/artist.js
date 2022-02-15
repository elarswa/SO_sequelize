module.exports = (sequelize, DataTypes) => {
  const artist = sequelize.define(
    'artist',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
    },
    {
      tableName: 'artist',
      underscored: true,
      timestamps: false,
    }
  );

  artist.associate = models => {
    artist.hasMany(models.album);
    artist.hasMany(models.track);
  };
  return artist;
};
