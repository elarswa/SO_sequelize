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
      tableame: 'artist',
      underscored: true,
      timestamps: false,
    }
  );

  artist.associate = models => {
    artist.hasMany(models.album, {
      foreignKey: 'artist_id',
    });
  };
  return artist;
};
