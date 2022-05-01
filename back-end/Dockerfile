FROM node:16

# Create App Directory
#WORKDIR /app

# Install Dependencies
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 3000

#LABEL org.opencontainers.image.source=https://github.com/software-assignments-spring2022/final-project-fitnet

CMD ["node","server.js"]