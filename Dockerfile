
# FROM node:18.18.0

# RUN npm i -g @nestjs/cli

# COPY package.json .

# RUN npm install

# RUN npm uninstall bcrypt

# RUN npm install bcrypt

# RUN npm start

# COPY . .

# EXPOSE 3000

# CMD ["nest", "start"]
# # Use an official Node.js runtime as a parent image
FROM node:18.18.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

# Copy the rest of the application code
COPY . .

# Copy the .env file
COPY .env .env

# Build the NestJS application
RUN npm run build


# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
# CMD ["npm", "run", "start:dev"]
CMD ["node", "dist/main"]


