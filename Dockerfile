# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies required for node-canvas
RUN apk add --no-cache \
    build-base \
    cairo-dev \
    pango-dev \
    giflib-dev \
    jpeg-dev \
    libpng-dev \
    freetype-dev

# Copy package.json and package-lock.json first (for caching layers)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose port 3000 for the NestJS application
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]