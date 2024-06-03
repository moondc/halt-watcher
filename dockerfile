FROM node:current-alpine3.19
WORKDIR /usr/src/app
COPY dist dist
COPY node_modules node_modules
CMD ["node", "dist/main.js"]