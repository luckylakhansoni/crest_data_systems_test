
//creating entity or schema 
// Properties: email, first name, last name, password, address, dob, hospital/clinic etc.

module.exports = (sequelize, DataTypes) => {
    const Docter = sequelize.define("Docter", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isEmail:true
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
          },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        address: DataTypes.STRING,
        DOB: DataTypes.STRING,
        hospital: DataTypes.STRING,
        password: DataTypes.STRING,
               
        isActive:{ // this column is using for soft delete 
            type: DataTypes.BOOLEAN,
            defaultValue: true
         },
    }, {
        timestamps: true,
        deletedAt: 'deletedAt',
        paranoid: true,
        tableName: "doctors"
    });
    sequelize.sync({
        force: false,
        logging: false,
        alter: true
    });
   
    return Docter;
  };