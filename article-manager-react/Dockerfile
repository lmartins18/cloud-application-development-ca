# syntax=docker/dockerfile:1
FROM node:21-alpine3.18
ENV NODE_ENV=production

# Copy package.json and package-lock.json separately to leverage Docker layer caching
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code and build the application
COPY . .
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Set the command to serve the build directory on port 3001
CMD ["serve", "-s", "build", "-l", "3001"]
