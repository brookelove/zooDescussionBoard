import { Comment } from "../models";

export async function getComments(req, res) {
  try {
    const comment = await Comment.find();
    res.json(comment);
  } catch (err) {
    console.error({ message: err });
    return res.status(500).json(err);
  }
}
export async function getSingleComment(req, res) {
  try {
    const comment = await Comment.findOne({ _id: req.params.commentId });

    !comment
      ? res.status(404).json({ message: "No comment with that ID" })
      : res.json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
}
export // create a new comment
async function createComment(req, res) {
  try {
    const comment = await Comment.create(req.body);
    res.json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
}
