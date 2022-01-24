const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//FETCHES ALL THE POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

//FIND A SPECIFIC POST
router.get("/:postId", async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({ message: err });
    }
});

//SUBMITS A POST
router.post("/", async(req, res) => {
    const post = new Post({
        title: req.body.title,  
        description: req.body.description
    });
    try {
        const savedpost = await post.save()
        res.json(savedpost)
    } catch (err) {
        res.json({ message: err });
    }

});

//DELETE A SPECIFIC POST
router.delete("/:postId", async (req, res) => {
    try{
    const delpost = await Post.remove({ _id: req.params.postId });
    res.json(delpost);
    } catch(err){
        res.json({ message: err });
    }
});

//UPDATE A POST
router.patch("/:postId", async (req, res) => {
    try{
    const toupdate = await Post.updateOne({ _id: req.params.postId }, {$set: { title: req.body.title }});
    res.json(toupdate);
    } catch(err){
        res.json({ message: err });
    }
});
router.get('/specific', (req, res) => {
    res.send("we are on specific posts");
});

module.exports = router;