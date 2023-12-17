# Use the specific version of Node.js runtime as a base image
FROM node:18.14.2

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port on which the app runs
EXPOSE 3500

# Define the command to run your application
CMD ["pm2", "start", "pm2.json"]
