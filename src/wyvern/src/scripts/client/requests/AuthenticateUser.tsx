import { apiURL } from "../Routes";

const routes = (await import("../Routes")).routes;

type LoginInfo = {
  email: string;
  password: string;
};

export default async function authenticateUser({ email, password }: LoginInfo) {
  return fetch(apiURL+routes.login, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}
