
# Using nginx mainline build
FROM nginx:1.17.1

# Copy all static files over
COPY ./dist/kitchenman-frontend/* /usr/share/nginx/html/

# Copy server configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose HTTP port
EXPOSE 80
