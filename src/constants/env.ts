enum Environment {
  BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5555",
  CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME || "domgx4abl",
  CLOUD_BASE_URL = import.meta.env.VITE_CLOUD_BASE_URL || "https://api.cloudinary.com/v1_1/",
  CLOUD_API_KEY = import.meta.env.VITE_CLOUD_API_KEY || "434269484377994",
  CLOUD_API_SECRET = import.meta.env.VITE_CLOUD_API_SECRET || "O1E5x9wsKQNXcMiGOa-dSDl2cpM",
  CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL || "cloudinary://434269484377994:O1E5x9wsKQNXcMiGOa-dSDl2cpM@domgx4abl",
  AUTH_SERVER_URL = import.meta.env.VITE_AUTH_SERVER_URL || "https://login.vinhuni.edu.vn",
}
export default Environment;
