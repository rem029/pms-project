# Welcome to wakra-server 👋

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> Back end for wakra project

## Install

```sh
yarn install
```

## Usage

```sh
yarn start
```

## Note

### .env file location
```
packages/backend
```
### .env format

```
DB_HOST=<mysql ip>
DB_PORT=<mysql port>
DB_USER=<mysql username>
DB_PW=<mysql password>
DB_DB=<mysql database name>

PORT=<port number>

API_TOKEN_SECRET=<random generated string>
API_TOKEN_REFRESH=<random generated string>

NODE_ENV=<development or production or etc...>
```

### Generating API TOKEN Key

Run in terminal/command prompt

```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

### .env sample usage

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=dbuser
DB_PW=dbpassword12345
DB_DB=mytabledb

PORT=9091

API_TOKEN_SECRET=12345
API_TOKEN_REFRESH=12345

NODE_ENV=staging
```

## Author

- Github: [@rem029](https://github.com/rem029)
