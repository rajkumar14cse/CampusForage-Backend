import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import Project from "./models/Project.js";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files and images correctly
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/campusforge", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Ensure directories exist
const uploadDir = "uploads";
const imageDir = path.join(uploadDir, "images");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, "uploads/images/");
    } else {
      cb(null, "uploads/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Upload Route
app.post(
  "/api/projects/upload",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, description, technologies, type, longDescription } = req.body;
      const projectFile = req.files["file"]?.[0].filename;
      const projectImage = req.files["image"]?.[0].filename;

      if (!projectFile || !projectImage) {
        return res.status(400).json({ error: "Files missing" });
      }

      const newProject = new Project({
        title,
        description,
        type,
        longDescription,
        technologies: technologies ? technologies.split(",") : [],
        projectFile,
        projectImage,
        downloadLink: `/uploads/${projectFile}`,
        imageUrl: `/uploads/images/${projectImage}`, // ✅ Correct image path
      });

      await newProject.save();
      res.json({ message: "✅ Project uploaded successfully", project: newProject });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Server error during upload" });
    }
  }
);

// ✅ Fetch All Projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// ✅ Fetch Single Project by ID
app.get("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// ✅ Delete Project by ID
app.delete("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    // Delete uploaded files
    if (project.projectFile) {
      fs.unlink(`uploads/${project.projectFile}`, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    if (project.projectImage) {
      fs.unlink(`uploads/images/${project.projectImage}`, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Project deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// ✅ Start Server After MongoDB Connects
mongoose.connection.once("open", () => {
  app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
});
