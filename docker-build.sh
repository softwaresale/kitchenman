#!/bin/bash
docker build -t kitchenman-gateway:latest . && \
docker tag kitchenman-gateway:latest softwaresale/kitchenman-gateway:latest
