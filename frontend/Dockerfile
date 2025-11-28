FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 5173
# CMD ["npx","nodemon","index.js"]
CMD ["npm","run","dev","--","--","host","0.0.0.0"]