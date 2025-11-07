# CampusForge Backend  
The CampusForge Backend is a Node.js + Express.js server that handles all project-related operations such as uploading projects, storing project metadata, authentication for admin users, and connecting with MongoDB for persistent storage.

---

## 🚀 Features  
✅ Upload project details (title, long description, technology stack, image, ZIP file)  
✅ Store metadata securely in MongoDB  
✅ Admin panel authentication (optional)  
✅ REST API endpoints for retrieving project list  
✅ Fetch single project details  
✅ Secure file upload using Multer  
✅ Integration with AWS S3 (optional for ZIP file storage)

---

## 🛠️ Tech Stack  
- **Node.js**  
- **Express.js**  
- **MongoDB / Mongoose**  
- **Multer** for file uploading  
- **CORS**  
- **dotenv** for environment variables  
- **AWS S3** *(optional)*

---

## 📁 Project Structure

backend/
│── src/
│ ├── config/
│ │ └── db.js # MongoDB connection
│ ├── models/
│ │ └── Project.js # Project schema
│ ├── routes/
│ │ └── projectRoutes.js
│ ├── controllers/
│ │ └── projectController.js
│ ├── uploads/ # Local file storage (image/zip)
│── .env
│── package.json
│── server.js

📌 Future Enhancements

✅ Admin authentication using JWT
✅ Manage multiple project categories
✅ Comments/ratings for projects
✅ Dashboard analytics for admins

📄 License

This project is open-source and available under the MIT License.


---

If you want, I can also prepare:

✅ **Client README**  
✅ **Full documentation page**  
✅ **Badges (Build passing, MongoDB connected, license badges)**  
✅ **API documentation table**

Just tell me!
