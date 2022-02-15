

const helper = require("../utils/helper");
const Bcrypt = require("bcryptjs");

const doctor = require("../DOM/doctors.dom");
const patient = require("../DOM/patient.dom");



// register docter
exports.register = async (req, res) => {
  try {
    let body = req.body;
    let query = {};
    query.where = {
      email: body.email,
    };
    let emailChecking = await doctor.singleRecord(query);
    if (emailChecking && emailChecking.email) {
      res.status(400).json({message:"Email already register"});
      return;
    }
    body.password = await helper.createPassword(body.password);
    let user = await doctor.createRecord(body);
    let jwt = await helper.jwtToken(user.user_id);
    res.setHeader("token", `Bearer ${jwt}`);
    user.jwtToken = jwt;
    user = user.toJSON();
    delete user.password;
    res.send(user);
  } catch (error) {
    console.log({ error });
    res.status(500).json("Error: " + error);
  }
};

// signin docter
exports.signin = async (req, res) => {
  try {
    let body = req.body;
    if(!body.email && !body.password){
      res.status(400).json({message: "Invalid email or password"});
      return;
    }
    let user;
    // checking email registerd ot not
    let query = {
      where: {},
    };
    query.where.email = body.email
    user = await doctor.singleRecord(query);
    if (!user) {
      res.status(400).json({message: "Email id does not match"});
      return;
    }
    if(user.isActive === false || user.isActive === 0) {
      res.status(400).json({message: "User is not active please contact admin"})
      return
    }
    
    let jwt = await helper.jwtToken(user.id);
    res.setHeader("x-access-token", `Bearer ${jwt}`);
    const verified = Bcrypt.compareSync(body.password, user.password);
    if (verified) {
      user = JSON.parse(JSON.stringify(user))
      delete user.password
      let date = new Date()
      res.send(user);
      return;
    } else {
      res.status(400).json({message: "You have entered wrong password"});
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json("Error: " + error);
  }
};


/// create patient
exports.addPatient = async (req, res) => {
  try {
    let body = req.body;
    await patient.createRecord(body);
    res.status(200).json({message: "patient addedd successfully"});
      return;
  } catch (error) {
    console.log({ error });
    res.status(500).json("Error: " + error);
  }
};

/// update patient
exports.updatePatient = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let query = {
      where: {
        patient_id: id,
      },
    };
    let checkingObj = await patient.singleRecord(query);
    if (!checkingObj) {
      res.status(400).json("Record not exists");
      return;
    }
    await patient.updateRecord(body, query);
    res.send("Record updated successfully");
  } catch (error) {
    console.log({ error });
    res.status(500).json("Error: " + error);
  }
};

/// soft delete  patient
exports.DeletePatient = async (req, res) => {
  try {
    let id = req.params.id;
    let body = {
      isActive: false
    }
    let query = {
      where: {
        patient_id: id,
      },
    };
    let checkingObj = await patient.singleRecord(query);
    if (!checkingObj) {
      res.status(400).json("Record not exists");
      return;
    }
    await patient.updateRecord(body, query);
    res.send("Record updated successfully");
  } catch (error) {
    console.log({ error });
    res.status(500).json("Error: " + error);
  }
};


/// list  patient with manage pagination
exports.listPatient = async (req, res) => {
  try {
    let body = req.query;
    body.limit = body.limit == undefined ? 10 : parseInt(body.limit);
    body.offset = body.offset == undefined ? 0 : parseInt(body.offset);
    let query2 = {
      where: {
        isActive: true
      },
      limit: body.limit,
      offset: body.offset,
      order: [["updatedAt", "DESC"]],
    };
  
    let data = await patient.findAlldb(query2);
    let count = await patient.recordCount({});

    if (data.length) {
      let resp = {
        data,
        count,
      };
      res.send(resp);
    } else {
      res.send([]);
    }
  } catch (error) {
    res.status(500).json(`Errro  ${error}`);
  }
};

// ==========================Thank you==============================








