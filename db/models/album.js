module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define(
    'album',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
    },
    {
      tableName: 'album',
      timestamps: false,
    }
  );

  album.associate = models => {
    album.belongsTo(models.artist, {
      foreignKey: 'artistId',
    });
    album.hasMany(models.track);
  };
  return album;
};
