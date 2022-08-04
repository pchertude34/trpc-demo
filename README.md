# End to End TypeScript with tRPC, Prisma and Next JS Demo
This repo provides skeleton code, as well as the completed code my End to End typescript demo. Use it to follow along, or to check out the finished code. You can find the completed code on the `complete` branch in this repository.

This project was bootstraped with a nice tool called `create-t3-app` which can be found here: https://github.com/t3-oss/create-t3-app

## How To Run
BEFORE DOING ANYTHING, RUN `npm install` PLEASE! If you don't have npm or node, install that. If you don't know how to, google it.

This application requires a database to run. The easiest way to do this is with docker. While you can use any database that [Prisma](https://prisma.io) supports, I used mysql and it will be easiest to just use a mysql database yourself. Here are the steps to get an instance of mysql running locally with docker:

1. Download Docker if you don't already have it installed: https://docs.docker.com/get-docker/
2. Pull the [Official mysql image from Docker Hub](https://hub.docker.com/_/mysql) with the command `docker pull mysql`
3. Run the mysql container: `docker run --name [CONTAINER_NAME] -e MYSQL_ROOT_PASSWORD=[MYSQL_PASSWORD] -p 3306:3306 -d mysql:latest`
   - `[CONTAINER_NAME]` any string, whatever you want to name your container
   - `[MYSQL_PASSWORD]` is the password for your mysql **root** user
4. Create a new database on your mysql instance.
   - In your terminal, run `docker exec -it [CONTAINER_NAME] mysql --password=[MYSQL_PASSWORD]` to connect to your container with mysql
   - Enter `CREATE DATABASE [DATABASE_NAME];` Where `[DATABASE_NAME]` is any valid mysql database name. Remember your database name.
   - You can quit the mysql cli by typing `quit` into the terminal.
5. Create a `.env` file at the root level of your project.
6. Add the variable `DATABASE_URL=mysql://root:[MYSQL_PASSWORD]@localhost:3306/[DATABASE_NAME]`
7. Build out the table structure with Prisma by running `npx prisma migrate dev` at the base of the project. Enter a name for the migration, "initial-setup" is fine.
8. Populate the database with Prisma by running `npx prisma db seed`. This uses the **seed.ts** file located at `./prisma/seed.ts`.

Your database should be all set! You can now run the project with `npm run dev` and should be available at http://localhost:3000.
