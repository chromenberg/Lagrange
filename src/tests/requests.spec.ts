import { describe, test } from "node:test";


describe("requests", (T) => {
    console.log("RUNNING "+T.fullName);
    async function signup(data: any): Promise<any> {
        return fetch("127.0.0.1:80/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(R=>R.json())
    }

    test("Sign up with valid info", async (ctx, res) => {
        const response = await signup({
            username: "raine",
            password: "unencrypted_password"
        })
        if (response) {
            const json = await response.json();
            if (Object.keys(json).includes("Authorization")) {
                res(json)
            }
            return;
        }
        return
    })

    test("Sign up with no password", async (ctx, res) => {
        const response = await signup({
            username: "raine",
            password: ""
        })
        if (response) {
            const json = await response.json();
            if (Object.keys(json).includes("Reason")) {
                res(json)
            }
            return;
        }
        return
    })

    test("Sign up with no username", async (ctx, res) => {
        const response = await signup({
            username: "",
            password: "password"
        })
        if (response) {
            const json = await response.json();
            if (Object.keys(json).includes("Reason")) {
                res(json)
            }
            return;
        }
        return
    })

    test("Sign up with nothing", async (ctx, res) => {
        const response = await signup({
            username: "",
            password: ""
        })
        if (response) {
            const json = await response.json();
            if (Object.keys(json).includes("Reason")) {
                res(json)
            }
            return;
        }
        return
    })
})