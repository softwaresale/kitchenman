
# Configure the application gateway

# Use nginx mainline version
FROM nginx:1.17.1

# Configure the nginx default server config file
RUN cd
COPY ./prep-nginx.sed .
RUN sed -i -f ./prep-nginx.sed /etc/nginx/conf.d/default.conf
RUN rm prep-nginx.sed

# Expose the port
EXPOSE 80
