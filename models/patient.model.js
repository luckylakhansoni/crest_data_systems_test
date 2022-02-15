
//creating entity or schema 
// Properties: Patient-Id, first name, last name, address, dob, mobile, city etc.
module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define("Patient", {
    patient_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
          },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        address: DataTypes.STRING,
        DOB: DataTypes.STRING,
        mobile: DataTypes.STRING,
        city: DataTypes.STRING,
               
        isActive:{ // this column is using for soft delete 
            type: DataTypes.BOOLEAN,
            defaultValue: true
         },
    }, {
        timestamps: true,
        deletedAt: 'deletedAt',
        paranoid: true,
        tableName: "patient"
    });
    sequelize.sync({
        force: false,
        logging: false,
        alter: true
    });
    return Patient;
  };