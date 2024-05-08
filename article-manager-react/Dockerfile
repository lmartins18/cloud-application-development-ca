# syntax=docker/dockerfile:1
FROM node:21-alpine3.18
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
RUN npm build
COPY . .
CMD ["serve", "-s", "build", "-l", "3001"]