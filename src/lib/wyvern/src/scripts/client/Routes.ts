export const apiURL = "/api/v1";

export const routes = {
  messages: "/channels/${}/messages",
  message: "/channels/${}/messages/${}",
  channels: "/channels/${}",
  guilds: "/guilds",
  guild_channels: "/guilds/${}/channels",
  register: "/auth/register",
  login: "/auth/login",
  me: "/users/@me",
  home: "/channels/@me"
};
export const routeArray = Object.values(routes)
