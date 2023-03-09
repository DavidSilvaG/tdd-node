# DDD example with NodeJS

This is an implementation of Domain Driven Design pattern using NodeJs with a little taste of Comand Query Responsability Segregation. The stack base is express with typescript, unit test with jest, logging strategy with console but easily replaced for your favorite logging tool(ex. Datadog) , OpenApi 3.0 documentation with SwaggerUi and typeOrm for manipulate mysql database. Here we will consume the popular [SWAPI](https://swapi.dev/) tool for devs.

## Running locally

1. Save the credentials of your db at the environment according the file **ormconfig.js** located at root or replace the values directly. You can use any local or remote mysql database.
2.  Execute `npm run install` and `npm run serve`
3.  Access through your favorite browser to `/docs` path and see the docs.
4. Check the logging strategy at the console for Request and Response method, body and error validation of every connection. You can add client ip, unique id from nginx configuration or similar and even measure the time using [this](https://ipirozhenko.com/blog/measuring-requests-duration-nodejs-express/) trick.
5. Execute `npm run test-linux` or `npm run test-windows` according your SO to see the test coverage (up to 97%).

## Live Version

Play [here](link) with this API deployed at [Render](https://render.com/) and using [AWS RDS](https://aws.amazon.com/rds/) as DBaaS.

