import { Animal } from "../models";

export async function getAnimal(req, res) {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (err) {
    console.error({ message: err });
    return res.status(500).json(err);
  }
}
export async function getSingleAnimal(req, res) {
  try {
    const animal = await Animal.findOne({ _id: req.params.animalId });

    !animal
      ? res.status(404).json({ message: "No Animal with that ID" })
      : res.json(animal);
  } catch (err) {
    res.status(500).json(err);
  }
}
export // create a new Animal
async function createAnimal(req, res) {
  try {
    const animal = await Animal.create(req.body);
    res.json(animal);
  } catch (err) {
    res.status(500).json(err);
  }
}
