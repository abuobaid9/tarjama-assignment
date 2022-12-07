const expenseModel = (sequelize:any,DataTypes:any)  => 
 sequelize.define('Expense', {
  spending_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    amount:{
        type: DataTypes.DOUBLE,
        allowNull:false,
    }
  });

  export {expenseModel};