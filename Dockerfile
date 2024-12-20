FROM node:18
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN cd /usr/src/app/
EXPOSE 3000
CMD ["node", "app.js"]
