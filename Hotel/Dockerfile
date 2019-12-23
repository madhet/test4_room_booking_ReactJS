#Base Image
FROM node:12.1.0
WORKDIR /Hotel
#Install dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

#Default command

CMD ["npm","start"]