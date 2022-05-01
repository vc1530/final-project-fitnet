FROM node:latest

# Working directory be app
#WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# copy local files to app folder
COPY . .

#LABEL org.opencontainers.image.source=https://github.com/software-assignments-spring2022/final-project-fitnet

EXPOSE 4000

CMD ["npm","start"]