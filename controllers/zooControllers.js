import { Zoo } from "../models";

export async function getZoo(req, res) {
  try {
    const zoos = await Zoo.find();
    res.json(zoos);
  } catch (err) {
    console.error({ message: err });
    return res.status(500).json(err);
  }
}
export async function getSingleZoo(req, res) {
  try {
    const zoo = await Zoo.findOne({ _id: req.params.zooId });

    !zoo
      ? res.status(404).json({ message: "No Zoo found with that ID" })
      : res.json(zoo);
  } catch (err) {
    res.status(500).json(err);
  }
}
export // create a new zoo
async function createZoo(req, res) {
  try {
    const zoo = await Zoo.create(req.body);
    res.json(zoo);
  } catch (err) {
    res.status(500).json(err);
  }
}
