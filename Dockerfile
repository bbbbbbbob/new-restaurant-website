# Static site for Google Cloud Run — nginx serves HTML/CSS/JS/assets.
FROM nginx:1.27-alpine

# Cloud Run expects the container to listen on this port.
ENV PORT=8080

COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/index.html
COPY menu /usr/share/nginx/html/menu
COPY location /usr/share/nginx/html/location
COPY birthday-party /usr/share/nginx/html/birthday-party
COPY contact-us /usr/share/nginx/html/contact-us
COPY jobs /usr/share/nginx/html/jobs
COPY assets /usr/share/nginx/html/assets
COPY video /usr/share/nginx/html/video
COPY shared /usr/share/nginx/html/shared

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
