FROM node as frontend
WORKDIR /app
COPY frontend/package.json .

COPY frontend/ .
RUN npm ci 
RUN npm run build 


FROM nginx
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=frontend /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
