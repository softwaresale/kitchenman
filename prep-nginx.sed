
# Change server name
3s/localhost/gateway/

# Configure the API reverse proxy
7a\
    location /api/v1/ {\
        proxy_pass http://api:3000/;\
    }\


# Configure the reverse proxy for the frontend
# First, delete the stuff already there
9,10d

# Next, append to line 8 the reverse proxy config
8a\
    proxy_pass http://frontend/;

# Deny access to htaccess files
41,43s/#//
