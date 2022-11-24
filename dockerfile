#command to run: docker run -p 3000:3000 -p 5000:5000 reactimage14
FROM node:16.17.0

WORKDIR /client
COPY ./client/package.json /client/package.json
RUN npm install
COPY ./client /client


WORKDIR /server
COPY ./server/package.json /server/package.json
RUN npm install
COPY ./server /server

EXPOSE 3000 5000

WORKDIR /client
CMD ["npm", "start"]