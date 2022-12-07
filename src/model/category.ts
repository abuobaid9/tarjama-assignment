const categoryModel = (sequelize:any,DataTypes:any) =>
 sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });

  export {categoryModel};