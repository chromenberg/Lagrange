# Wyvern
Wyvern is **another** Discord clone, designed in typescript for the time being.

3 core parts are included, the database,  the gateway / api and the frontend.

Events are designed to be almost identical to provide cross compatibility with little changes needed. The design structure is currently monolithic,  however plans to allow horizontal scaling are in place. 

## How do I add new features? 

If you want to add a new feature into the project, you will usually be interacting with the `services` folder. Currently the services are one big individual file, however the ability to support microservices that merge into one service may be done in the future.

Adding a new service is done by creating the service in `Requests.ts`, creating a private property within the request class, creating the service in the constructor and adding a getter.

## What if i want to add a new table? 

In the `tables` folder you are able to make a new folder and import the `Table` class. Listen to the process event `atlaspreinit` which is the staging point for mounting tables, then run `Atlas#mount(Table)`

`Table` is a builder that allows building SQLite tables in a much cleaner JSON or Object format.

## I want to update the gateway! 

God no it's so fucking bad even i can't figure out how to do this. 
Sooner or later I'll shift my focus on rebuilding the architecture of the whole project to be a lot more cleaner and modular. 

## Node keeps warning me about an event emitter memory leak! 

That's the router, I'll fix that eventually. It creates a new listener for every route.

# How to install

You will need, go-26+, nodejs 26+, scylladb

Create a scylladb docker container called "AtlasDB" following their tutorial, change the password to whatever you desire, and add that password into the database config. 

Clone the repo and cd into the project. 

Run `npm i` to install all the packages needed to run. 
Then you can build the gofiles `Snowflake` and `Crypt` into a WASM project. These get moved into their corresponding `dist` (will change at some point) 
Then create a folder called `logs` in the project route.

On linux you can run `sudo npm start` to start the server and connect to the website at `127.0.0.1/channels/@me`

`sudo npm run build` is to build a production version of the website, because of how the server is setup, this is hot swappable

`sudo npm run dev` runs the development server for the website. 


Fuck this project and it's shitty convoluted file structure and architecture
