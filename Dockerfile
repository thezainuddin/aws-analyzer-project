FROM node:12-alpine
COPY . ./app
WORKDIR ./app
RUN npm install
EXPOSE 8000
CMD ["node","app.js"]
