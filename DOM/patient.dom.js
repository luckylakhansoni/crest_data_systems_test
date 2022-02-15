const db = require("../models");

module.exports.createRecord = async (query)=>{
    try {
        let data = await db.patient.create(query)
        return data
    } catch (error) {
        throw error
    }
}
module.exports.singleRecord = async (query) => {
    try {
        let data = await db.patient.findOne(query)
        return data
    } catch (error) {
        throw error
    }
}

module.exports.updateRecord = async (body, query) => {
    try {
        let data = await db.patient.update(body, query)
        return data
    } catch (error) {
        throw error
    }
}


module.exports.findAlldb = async(query)=> {
    try {
        let data = await db.patient.findAll(query)
        return data
    } catch (error) {
        throw error
    }
}

module.exports.deletedb = async(query)=> {
    try {
        let data = await db.patient.destroy(query)
        return data
    } catch (error) {
        throw error
    }
}


module.exports.findAlldb = async(query)=> {
    try {
        let data = await db.patient.findAll(query)
        return data
    } catch (error) {
        throw error
    }
}
module.exports.findAndCount = async(query)=> {
    try {
        let data = await db.patient.findAndCountAll(query)
        return data
    } catch (error) {
        throw error
    }
}

module.exports.recordCount = async(query)=> {
    try {
        let data = await db.patient.count(query)
        return data
    } catch (error) {
        throw error
    }
}

