# Leddit
Creating a wykop.pl / reddit.com inspired site with the following tech

* angular (front end framework)
* koa (backend framework)
* jwt (RESTful token based auth)
* knex / bookshelf (data modeling, query builder and ORM)
* webpack & babel(front end module system providing es6 for current day browsers)
* and some util libs (moment, lodash etc)

#Setup

First make sure you have
* Nodejs 4+ and npm 3+
* knex (```npm install -g knex```)
* webpack (```npm install -g webpack```)

run the following commands
* ```git clone https://github.com/Taximan/Leddit.git```
* ```cd Leddit```
* ```npm install```
* ```cd database```
* ```knex migrate:latest```
* ``` knex seed:run``` (optional)
* ```cd ..```
* ```node app.js```
* for front end development also run ```webpack -w ``` 


Because this site isn't meant to be any serious its been done on sqlite, 
however you should be able to just run it with any supported by knex db like postgresql, 
mysql or (risky) mongodb. 
