#base image 
FROM node:20
#setting working directory inside container
 WORKDIR /app

#copy  package.json
COPY package*.json ./
#install dependencies
 RUN npm install
 #copy application code inside the container
 COPY . .
 EXPOSE 3000
#docker will automatically run following command  when you start docker container
 CMD [ "node" , "server.js" ]

