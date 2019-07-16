
# Use Apache server
FROM httpd:2.4

# Clear out other flies
RUN rm /usr/local/apache2/htdocs/*

# Copy prod files into apache
COPY ./dist/kitchenman-frontend/* /usr/local/apache2/htdocs/

# Copy Config file
COPY ./htaccess /usr/local/apache2/htdocs/.htaccess

# Copy in sed script
COPY ./prep-httpd.sed .

# Modify the configuration file
RUN sed -i -f ./prep-httpd.sed /usr/local/apache2/conf/httpd.conf

# Remove the sed script
RUN rm prep-httpd.sed

# Expose the right port
EXPOSE 80

