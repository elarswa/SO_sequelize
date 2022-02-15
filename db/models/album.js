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
      underscored: true,
    }
  );

  album.associate = models => {
    album.belongsTo(models.artist, {
      foreignKey: 'artist_id',
      // allowNull: false,
    });
    album.hasMany(models.track, {
      foreignKey: 'id',
    });
  };
  return album;
};
