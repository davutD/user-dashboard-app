FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the remaining application code to the container
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
