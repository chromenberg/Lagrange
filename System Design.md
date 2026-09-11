# System Design

The design of the project can be split into several sections that all have their own key functionality, because of this there will be 3 core parts, the frontend, the database and the server.
The server will be responsible for handling and managing connections and requests by listening using a websocket or http server.

## Server
The server will be responsible for all connections and requests made towards the service, it needs to listen for requests

> Fill Out Later

### Event Loop

#### Connecting to the server

[todo: replace with flowchart]
Client opens a connection to server
-> Gateway responds with `OPCODE_HELLO` and should tell the client how often to send a heartbeat message 
-> client sends an auth request to log in to their account using their token 
-> gateway responds with `OPCODE_DISPATCH EVENTNAME_READY` if their token is valid, 
this contains all the information about the user, what guilds they are in, their friends and profile data. 
-> Client registers data into its stores.

[Repeat Forever] Gateway sends a message when a new event occurs (ie. message created in a channel they can see, or someone updates their profile)


## Database
Image: https://cdn.chromenberg.com/dbdiagram.io_d.png

The image above shows the Entity Relationship Diagram for the current database schema. The database runs in SQLite and is managed through NodeJS.

The table named "users" will contain every single registered account on the system, they are required to have a username which allows other users to identify them and make a request to friend them.
Each user also has a unique identifier called a Snowflake, this is a roughly time sortable unique id that contains the time the account was created, 
what worker it was created on; the user service has its own snowflake generator, so it has its own worker id. And also a sequence ID.

A user has a display name `display_name` which is a name that does not have to be unique, many other users can have the same display name. 
A display name is what shows when a user sends a message, joins a server, is in the server members list, etc. It is their global name. 
If a user does not have a display name set, the client will revert to using the accounts username as a fallback display name as `display_name` cannot be truly invalid.

Users also have a `bio` field, this is their about me in their profile, where a user can add information about themselves to show others. 
This ties into the other field called `pronouns` this was implemented purely to reach further parity with other platforms, 
but allows users to set their preferred pronouns to be referred by, by other people.

The users table also stores the registered email and password with their account, this is required and is added during account registration.
Another field is the token field, this is the users active session token and is required for all API requests to ensure that the user is making a request to a place they can access, 
for example they cannot access messages of a server they are not in. It is also **required** for the token to be used to get messages from the server.



The guilds table (aka: servers) contains a unique Snowflake ID for a guild, with a different worker ID which will ensure that the identifiers do not collide.
A guild contains information about its name and is referenced by other tables like `channels` `guild_members` and `roles`
The field `owner_id` references the user id of whoever made the guild which is used for checking user permissions (can they delete the server, can they be banned, etc) 

The field `guild_name` contains the name that all users will see when interacting with the server, this cannot be null.
The field `icon_hash` is a string that contains the hash of the uploaded image that, for a user, will show in place of the named icon on the server list.
This link is accessed via a custom image proxy to allow for resizing of the image, these images are stored in cloudflare.


