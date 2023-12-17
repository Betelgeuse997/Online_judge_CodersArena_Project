FROM node:16-alpine
WORKDIR /app
RUN apk --update add openjdk11 g++ python3 gcc
COPY . .
RUN npm uninstall bcrypt
RUN npm install bcryptjs
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]

# # Use an official Node.js runtime as a parent image
# FROM node:16-alpine

# # Set the working directory in the container
# WORKDIR /app

# # Install OpenJDK, g++, Python 3, and gcc (if needed for your dependencies)
# RUN apk --update add openjdk11 g++ python3 gcc

# # Copy the backend server code
# COPY Backend /app/Backend

# # Install bcryptjs and other dependencies
# RUN npm uninstall bcrypt 
# RUN npm install bcryptjs 
# RUN npm install

# # Copy the frontend build
# COPY frontend/build frontend/build

# # Expose port 5000 for the Node.js server
# EXPOSE 5000

# # Command to run the application
# CMD ["npm", "start"]
