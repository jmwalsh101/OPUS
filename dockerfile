FROM node:16
WORKDIR /opus

# copy both client and server
COPY client/package*.json ./
COPY server/package*.json ./

RUN npm ci
COPY . .
EXPOSE 8081
CMD [“node”, “index.js”]