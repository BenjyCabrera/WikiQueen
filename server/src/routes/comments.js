const { Router } = require("express");

const Comment = require("../models/comment.js");

const router = Router();

//////// POST ADDCOMMENTS ////////

router.post("/addcomments", async (req, res) => {
  const { texto } = req.body;

  try {
    const addcomments = await Comment.create({ texto });
    res.setHeader("x-auth-token", texto).json(addcomments);
    console.log("exito");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
