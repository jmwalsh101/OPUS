# syntax=docker/dockerfile:1
FROM circleci/node:10.16.3
ENV NODE_ENV=production
COPY ["client/package*.json", "./"]
RUN sudo npm install -g
RUN 
COPY . .

EXPOSE 3000

CMD ["npm", "start"]