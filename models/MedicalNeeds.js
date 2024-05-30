const { Schema, model } = require("mongoose");

const medicalNeedSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  details: String,
  needsMedication: {
    type: Boolean,
    required: true,
  },
  medication: [{ type: String }],
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notes",
    },
  ],
});

const MedicalNeeds = model("MedicalNeed", medicalNeedSchema);

module.exports = MedicalNeeds;
