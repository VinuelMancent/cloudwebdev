FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm install express
# If you are building your code for production
# RUN npm ci --omit=dev
RUN npm install express-ejs-layouts

COPY . .

EXPOSE 80
CMD [ "node", "default.js" ]