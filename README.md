# J's Meet 'n' Greet

## Setup
This Project is meant to be run using Docker.  

Before starting the application look at the .env.example file and create your own .env file based on that or configure your environment variables in some other way.  

To start the application you must only run `docker compose up --build -d`.  
To stop it you should only have to run `docker compose down`.  

## Database Upgrades
You have to do Database Migrations manually when you update to a newer version. This is to avoid issues by not adding migrations to application startups.  
To do so you must manually execute the upgrade_db.sh script inside the running backend container.  
The command to do so might look like this `docker exec -it jsmeetngreet-backend-1 sh "scripts/upgrade_db.sh"`.  
Theoretically no restart should be required.