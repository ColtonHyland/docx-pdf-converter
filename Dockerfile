# Use NodeJS official image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port that NestJS will run on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:dev"]