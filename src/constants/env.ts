enum Environment {
  BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:5555",
  CLOUD_NAME = import.meta.env.CLOUD_NAME || "domgx4abl",
  CLOUD_PRESET = import.meta.env.CLOUD_PRESET || "ml_default",
  CLOUD_API_KEY = import.meta.env.CLOUD_API_KEY || "295347977561253",
  CLOUD_API_SECRET = import.meta.env.CLOUD_API_SECRET || "vJ2HqT9z5X9XqDq5L2bJz1fZb1E",
  CLOUD_BASE_URL = import.meta.env.CLOUD_BASE_URL || "https://api.cloudinary.com/v1_1/",
}

export default Environment;
