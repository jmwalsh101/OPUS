# syntax=docker/dockerfile:1
FROM circleci/node:10.16.3
ENV NODE_ENV=production
COPY ["client/package*.json"]
RUN sudo npm install -g
COPY . .
CMD ["npm", "start"]