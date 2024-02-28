require("dotenv").config()

const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const passport = require("passport")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const Post = require("../models/post")
const User = require("../models/user")
const Comment = require("../models/comments")

// home
router.get("/", asyncHandler(async (req, res) => {

}))

// get all posts

router.get("/posts", asyncHandler(async (req, res) => {
    const [allPosts, allComments] = await Promise.all([
        Post.find({}).populate("user", "username"),
        Comment.find({}).populate("user", "username")
    ])

    res.json({allPosts, allComments})
}))

// get one post
router.get("/posts/:id", asyncHandler(async (req, res) => {
    res.json("asdfb")
}))

// create post
router.post("/posts/create", asyncHandler(async (req, res) => {
    const post = new Post({
        user: req.body.user,
        title: req.body.title,
        content: req.body.content
    })
    await post.save()
    res.json({post})
}))

// change post publish
router.patch("/post/publish/:postId", asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.body.postId)
    post.published = !post.published
    await post.save()
    res.status(200).send("good")
}))

router.delete("/post/delete/:postId", asyncHandler(async (req, res, next) => {
    await Post.findByIdAndDelete(req.params.postId)
    res.status(200).send("good")
}))

// delete post
router.delete("/posts/:id", asyncHandler(async (req, res) => {
    
}))

// update post
router.patch("/post/update/:postId", asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.postId)
    post.title = req.body.updatedTitle
    post.content = req.body.updatedContent
    await post.save()
    res.status(200).send("gut")

}))

// COMMENTS

// post comment
router.post("/comment/create", asyncHandler(async (req, res, next) => {
    const commentator = await User.findOne({username: req.body.user})
    const comment = new Comment({
        user: commentator._id,
        post: req.body.postId,
        content: req.body.comment
    })

    await comment.save()
    res.json(comment).send("good comment")
}))

router.post("/users/logout", asyncHandler(async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log(err)
            return next(err)
        }
    })
    res.status(200).send("logged out")
}))


// get all users
router.get("/user", asyncHandler(async (req, res) => {
    const posts = await Post.find().populate("user", "username").exec()

    res.json(posts)
}))

// get one user
router.get("/users/:id", asyncHandler(async (req, res) => {
    
}))

// login user
router.post("/users/login", asyncHandler(async (req, res, next) => {
    const user = await User.findOne({username: req.body.username})

    if (user) {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ auth: false, message: "No user" });
            }
            
            req.login(user, (err) => {
                if (err) {
                    return next(err)
                }
            })
            const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: 600 });
            res.cookie("token", token)
            res.json({ auth: true, token, user });
        })(req, res, next);
    } else {
        return res.status(400).send("No user found")
    }
}))

// create user
router.post("/users/create", asyncHandler(async (req, res) => {
    const allUsers = await User.findOne({username: req.body.username})

    if (allUsers) {
        return res.status(400).send("User already exists")
    }

    bcrypt.hash(req.body.password, 5, async (err, hashedPassword) => {
        if (err) throw err
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        })

        await newUser.save()
        res.status(200).send("created user")
    })
}))

module.exports = router