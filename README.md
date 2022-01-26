express-react.js-node.js-mongodb-rest-api
=========================================

installation
=============
clone this repository by running
```
git clone https://github.com/DennisRono/express-react.js-node.js-mongodb-rest-api.git
```
then enter into the directory by running
```
cd express-react.js-node.js-mongodb-rest-api
```

download the backend packages by running
```
npm i
```
then enter the client frontend directory
```
cd client
```
install the frontend packages
```
npm i
```

setting up your mongodb database connection
===========================================
create a `config.env` file on the parent directory
```
touch config.env
```
type the following in the config.env file
```
ATLAS_URI=<your mongodb connection string with username and password and database name>
```

usage
=====
while on the parent directory run
```
npm run serve
```
this starts your backend server

enter the client directory and run
```
npm start
```
this starts your frontend server

