import { describe, test } from "node:test";


describe("requests", (T) => {
    console.log("RUNNING "+T.fullName);
    test("fetch me endpoint", (ctx, done) => {
        fetch("127.0.0.1/test/api/v1/users/@me").then(async res => {
            const r = (await res.json())
            if (r.data === 200) {
                done(r)
            }
        })
    })
    test("fetch user profile endpoint", (ctx, done) => {
        fetch("http://127.0.0.1/test/api/v1/users/15935/profile").then(async res => {
            const r = (await res.json())
            if (r.data === 200) {
                done(r)
            }
        })
    })
    test("fetch user guilds v2 endpoint", (ctx, done) => {
        fetch("http://127.0.0.1/test/api/v2/users/guilds").then(async res => {
            const r = (await res.json())
            if (r.data === 200) {
                done(r)
            }
        })
    })

    test("fetch user guilds v2 paramatered endpoint", (ctx, done) => {
        fetch("http://127.0.0.1/test/api/v2/users/guilds/204").then(async res => {
            const r = (await res.json())
            if (r.data === 200) {
                done(r)
            }
        })
    })
    
    test("fetch versioned api paramed user endpoint", (ctx, done) => {
        fetch("http://127.0.0.1/test/api/v6/users/20354").then(async res => {
            const r = (await res.json())
            if (r.data === 200) {
                done(r)
            }
        })
    })
})