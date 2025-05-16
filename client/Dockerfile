# 1. Use Node as base image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the client app
COPY . .

# 6. Build the app
RUN npm run build

# 7. Use "serve" to serve the static site
RUN npm install -g serve

# 8. Start the app on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]
