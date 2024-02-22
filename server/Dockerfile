# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Nest CLI globally (you can remove this if you're not using it)
RUN npm install -g @nestjs/cli

# Install dependencies
RUN npm install

# Copy the remaining application code to the container
COPY . .

# Expose port 3333 to the outside world
EXPOSE 3333

# Command to run the application
CMD ["npm", "run", "start:dev"]
