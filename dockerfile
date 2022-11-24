# syntax=docker/dockerfile:1
# change node image
FROM circleci/node:10.16.3
# this should be coming from the runner
ENV NODE_ENV=production
# local - dev/ circlci - test; aws prod
# copy server later too
COPY [ "./client/"]
RUN ls
RUN cd ./client
RUN npm install
# COPY . .
CMD ["npm", "start"]