export const rootURL = "/api/v1";

export const routes = {
  messages: rootURL + "/channels/${}/messages",
  message: rootURL + "/channels/${}/messages/${}",
  guilds: rootURL + "/guilds",
  guild_channels: rootURL + "/guilds/${}/channels",
  register: rootURL + "/auth/register",
  login: rootURL + "/auth/login",
};
export const routeArray = Object.values(routes)
