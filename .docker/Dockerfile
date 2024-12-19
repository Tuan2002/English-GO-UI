# Step 1: Build the React app
FROM node:18-alpine3.20 AS builder

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY ../package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app source code
COPY ../ ./
# Define build-time arguments
ARG VITE_BACKEND_URL
ARG VITE_CLOUD_NAME
ARG VITE_CLOUD_BASE_URL
ARG VITE_CLOUD_API_KEY
ARG VITE_CLOUD_API_SECRET
ARG VITE_CLOUDINARY_URL
ARG VITE_AUTH_SERVER_URL
ARG VITE_CLIENT_ID
ARG VITE_REDIRECT_URL

# Set environment variables
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_CLOUD_NAME=${VITE_CLOUD_NAME}
ENV VITE_CLOUD_BASE_URL=${VITE_CLOUD_BASE_URL}
ENV VITE_CLOUD_API_KEY=${VITE_CLOUD_API_KEY}
ENV VITE_CLOUD_API_SECRET=${VITE_CLOUD_API_SECRET}
ENV VITE_CLOUDINARY_URL=${VITE_CLOUDINARY_URL}
ENV VITE_AUTH_SERVER_URL=${VITE_AUTH_SERVER_URL}
ENV VITE_CLIENT_ID=${VITE_CLIENT_ID}
ENV VITE_REDIRECT_URL=${VITE_REDIRECT_URL}

# Build the TypeScript code
RUN npm run build
# Step 2: Serve the app using a lightweight web server
FROM nginx:alpine AS production

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the built files from the previous stage to the Nginx web root
COPY --from=builder /usr/src/app/dist .

# Copy custom Nginx configuration if needed (optional)
COPY ../.docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the server
EXPOSE 5100

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
