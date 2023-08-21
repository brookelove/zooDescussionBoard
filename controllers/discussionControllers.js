import { Discussion } from "../models";

export async function getDiscussion(req, res) {
  try {
    const discussions = await Discussion.find();
    res.json(discussions);
  } catch (err) {
    console.error({ message: err });
    return res.status(500).json(err);
  }
}
export async function getSingleDiscussion(req, res) {
  try {
    const discussion = await Discussion.findOne({ _id: req.params.postId });

    !discussion
      ? res.status(404).json({ message: "No post with that ID" })
      : res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}
export // create a new post
async function createDiscussion(req, res) {
  try {
    const discussion = await Discussion.create(req.body);
    res.json(discussion);
  } catch (err) {
    res.status(500).json(err);
  }
}
