FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm install express
# If you are building your code for production
# RUN npm ci --omit=dev
RUN npm install cors

COPY . .

EXPOSE 81
CMD [ "node", "default.js" ]