
# Change server name
3s/localhost/gateway/

# Configure the API reverse proxy
7a\
    location /api/v1/ {\
	if ($request_method = 'OPTIONS') {\
            add_header 'Access-Control-Allow-Origin' '*';\
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';\
            #\
            # Custom headers and headers various browsers *should* be OK with but aren't\
            #\
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';\
            #\
            # Tell client that this pre-flight info is valid for 20 days\
            #\
            add_header 'Access-Control-Max-Age' 1728000;\
            add_header 'Content-Type' 'text/plain; charset=utf-8';\
            add_header 'Content-Length' 0;\
            return 204;\
        }\
        if ($request_method = 'POST') {\
            add_header 'Access-Control-Allow-Origin' '*';\
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';\
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';\
            add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';\
        }\
        if ($request_method = 'GET') {\
            add_header 'Access-Control-Allow-Origin' '*';\
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';\
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';\
            add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';\
        }\
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

