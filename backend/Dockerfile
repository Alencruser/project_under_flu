FROM node:slim

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 3000
CMD ["npm", "run", "start"]