
# Name the node stage "builder"
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app

# Copy our node module specification
COPY package.json package.json

# install node modules and build assets
RUN npm install --production
RUN npm install json-server -g --silent
# Copy all files from current directory to working dir in image
# Except the one defined in '.dockerignore'
COPY . .

CMD ["npm", "run", "json-server", "--watch", "public/db.json", "-p", "3002"]
# Create production build of React App
RUN npm run build

# Choose NGINX as our base Docker image
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf *

# Copy static assets from builder stage
COPY --from=builder /app/build .

# Entry point when Docker container has started
ENTRYPOINT ["nginx", "-g", "daemon off;"]



