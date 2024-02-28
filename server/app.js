require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const initializePassport = require("./passport_config")
const cookieParser = require("cookie-parser")

const session = require("express-session")
const passport = require("passport")

const app = express()

// database
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", (error) => console.log(error))

app.use(cors({
    origin: 'http://localhost:5173',
    method: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser())

app.use(session({secret: "cats", resave: false, saveUnitialized: true}))
initializePassport.initialize(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})

app.use(express.json())

const blogRouter = require("./routes/blog")

app.use("/", blogRouter)

  

app.listen(3000, () => console.log("Server started"))
