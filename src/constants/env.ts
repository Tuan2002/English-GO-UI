enum Environment {
  BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:8080",
  CLOUD_NAME = import.meta.env.CLOUD_NAME || "domgx4abl",
  CLOUD_BASE_URL = import.meta.env.CLOUD_BASE_URL || "https://api.cloudinary.com/v1_1/",
  CLOUD_API_KEY = import.meta.env.CLOUD_API_KEY || "434269484377994",
  CLOUD_API_SECRET = import.meta.env.CLOUD_API_SECRET || "O1E5x9wsKQNXcMiGOa-dSDl2cpM",
  CLOUDINARY_URL = import.meta.env.CLOUDINARY_URL || "cloudinary://434269484377994:O1E5x9wsKQNXcMiGOa-dSDl2cpM@domgx4abl",
}

export default Environment;
