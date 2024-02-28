const mongoose = require("mongoose")
const {DateTime} = require("luxon")

const Schema = mongoose.Schema

const commentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    post: {type: Schema.Types.ObjectId, ref: "Post"},
    content: {type: String, required: true, maxLength: 100, minLength: 5},
    datetime: {type: Number, required: true, default: Date.now()},
})

commentSchema.virtual("date_formatted").get(function () {
    return DateTime.fromMillis(this.datetime).toLocaleString(DateTime.DATETIME_MED)
})

commentSchema.set("toJSON", {virtuals: true})

module.exports = mongoose.model("Comment", commentSchema)