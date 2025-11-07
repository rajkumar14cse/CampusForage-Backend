import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, default: "Minor" }, // Major / Minor
  longDescription: String,
  technologies: [String],
  developers: [String],
  projectFile: String,
  projectImage: String,
  downloadLink: String,
  imageUrl: String,
});

export default mongoose.model("Project", projectSchema);
