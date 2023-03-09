# DDD example with NodeJS

This is an implementation of Domain Driven Design pattern using NodeJs with a little taste of Comand Query Responsability Segregation. The stack base is express with typescript, unit test with jest, logging strategy with console but easily replaced for your favorite logging tool(ex. Datadog) , OpenApi 3.0 documentation with SwaggerUi and typeOrm for manipulate mysql database. Here we will consume the popular [SWAPI](https://swapi.dev/) tool for devs.


## Running locally

1. Save the credentials of your db at the environment according the file **ormconfig.js** located at root or replace the values directly. You can use any local or remote mysql database.

![image](https://user-images.githubusercontent.com/75549428/224102669-a559e9da-caa3-4220-88e0-1422810b4e05.png)

2.  Execute `npm run install` and `npm run serve`
3.  Access through your favorite browser to `/docs` path and see the docs.
![image](https://user-images.githubusercontent.com/75549428/224103033-94a85730-0971-49e6-9c93-07a428111144.png)

4. Check the logging strategy at the console for Request and Response method, body and error validation of every connection. You can add client ip, unique id from nginx configuration or similar and even measure the time using [this](https://ipirozhenko.com/blog/measuring-requests-duration-nodejs-express/) trick.
![image](https://user-images.githubusercontent.com/75549428/224103108-d99e11da-0283-4ab2-a359-88e4cab80b6a.png)

5. Execute `npm run test-linux` or `npm run test-windows` according your SO to see the test coverage (up to 97%).
![image](https://user-images.githubusercontent.com/75549428/224103151-f1e8e179-8661-4cf8-9a10-52d5f8f4a691.png)


## Live Version

Play [here](https://tdd-node.onrender.com/docs/) with this API deployed at [Render](https://render.com/) and using [AWS RDS](https://aws.amazon.com/rds/) as DBaaS.
