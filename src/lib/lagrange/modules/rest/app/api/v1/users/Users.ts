import { API } from "../../../../REST.js";
import { fetchSelfClient } from "./getOwnClient.js";

API.get("/api/v1/users/@me", (req, res) => {
    
});

// TODO: INCREDIBLY UNSAFE, NEED ENCRYPTION
API.get("/api/v1/auth/signup", (req, res) => {
    console.log(req.headers);
    
})