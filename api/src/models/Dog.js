const { DataTypes, Op } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    externalId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    height_max:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight_max:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height_min:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight_min:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    freezeTableName: true,
    indexes: [
      {
          unique: true,
          fields: ['externalId'],
          where: {
            externalId: {
              [Op.ne]: null
            }
          },
      },
  ],
  },
  );
};
