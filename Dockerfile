ARG VERSION=12

FROM node:${VERSION}

WORKDIR /home/oshinka/Documents/node-course/nsbm-api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "start"]