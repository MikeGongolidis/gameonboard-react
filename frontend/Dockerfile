# first stage builds vue 
FROM node as frontend
WORKDIR /app
COPY package.json .

COPY . .
RUN npm ci 
RUN npm run build 
