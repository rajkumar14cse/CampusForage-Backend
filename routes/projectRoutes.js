import multer from "multer";
import path from "path";

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure "uploads" folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Route
router.post(
  "/upload",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, description, technologies } = req.body;

      // Get file paths
      const projectFile = req.files.file ? req.files.file[0].path : null;
      const projectImage = req.files.image ? req.files.image[0].path : null;

      // Save to MongoDB
      const newProject = new Project({
        title,
        description,
        technologies,
        filePath: projectFile,
        imagePath: projectImage,
      });

      await newProject.save();

      res.json({ message: "✅ Project uploaded successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "❌ Failed to upload project" });
    }
  }
);
