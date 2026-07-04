# Internal API Map

## Lagrange

Lagrange is the backend system for the entire Wyvern project, it manages incoming connections and gateway events.

Lagrange's API is constantly updating but currently the API contains 4 different services, some completely non-functional.


### AuthService

This service encompasses everything about **authentication**, like **registering** a user or transferring **sessions**.

---

#### `/api/:v/auth/register` - `registerUser`

Creates a new user with the username, email and password specified

|Field Name|Type|Required|Info|
|----------|----|--------|----|
|`username`|String|Yes|The username of the account to be created|
|`email`|String - `string@string.string`|Yes|Accounts email|
|`password`|String|Yes|Hash of the accounts password (should be salted too)|

**@returns** - Info of the new user

## Atlas

The database manager for Lagrange, manages the noSQL database and the SQL database in one unified entrypoint by abstracting many requests into simple functions.

##
