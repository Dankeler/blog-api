const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, required: true, maxLength: 100, minLength: 5},
    password: {type: String, required: true, maxLength: 100, minLength: 5},
})

module.exports = mongoose.model("User", userSchema)