#!/usr/bin/env bash

# remove any existing containers
docker container prune -f

# build the image and run the container
docker build -t node-app .
docker container run --name node-app -it -rm -p 8888:8888 -v ~/Documents/Gitworkspace/node-pg-docker/node/src:/usr/src/app/src node-app