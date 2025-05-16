# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server files
COPY . .

# Expose the port
EXPOSE 3001

# Start the server
CMD ["node", "index.js"]
