const db = require("../models");

module.exports.createRecord = async (query)=>{
    try {
        let data = await db.doctor.create(query)
        return data
    } catch (error) {
        throw error
    }
}
module.exports.singleRecord = async (query) => {
    try {
        let data = await db.doctor.findOne(query)
        return data
    } catch (error) {
        throw error
    }
}

module.exports.updateRecord = async (body, query) => {
    try {
        let data = await db.doctor.update(body, query)
        return data
    } catch (error) {
        throw error
    }
}


module.exports.findAlldb = async(query)=> {
    try {
        let data = await db.doctor.findAll(query)
        return data
    } catch (error) {
        throw error
    }
}

module.exports.deletedb = async(query)=> {
    try {
        let data = await db.doctor.destroy(query)
        return data
    } catch (error) {
        throw error
    }
}


module.exports.findAlldb = async(query)=> {
    try {
        let data = await db.doctor.findAll(query)
        return data
    } catch (error) {
        throw error
    }
}
module.exports.findAndCount = async(query)=> {
    try {
        let data = await db.doctor.findAndCountAll(query)
        return data
    } catch (error) {
        throw error
    }
}

module.exports.recordCount = async(query)=> {
    try {
        let data = await db.doctor.count(query)
        return data
    } catch (error) {
        throw error
    }
}

