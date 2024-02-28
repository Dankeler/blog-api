const mongoose = require("mongoose")
const {DateTime} = require("luxon")

const Schema = mongoose.Schema

const postSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true, maxLength: 30, minLength: 5},
    content: {type: String, required: true, maxLength: 100, minLength: 5},
    datetime: {type: Number, required: true, default: Date.now()},
    published: {type: Boolean, required: true, default: true}
})

postSchema.virtual("date_formatted").get(function () {
    return DateTime.fromMillis(this.datetime).toLocaleString(DateTime.DATETIME_MED)
})

postSchema.set("toJSON", {virtuals: true})

module.exports = mongoose.model("Post", postSchema)