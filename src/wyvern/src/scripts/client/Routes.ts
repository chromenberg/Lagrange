export const apiURL = "/api/v1";

export const attachments = "http://127.0.0.1:82"
export const routes = {
  messages: "/channels/${}/messages",
  message: "/channels/${}/messages/${}",
  channels: "/channels/${}/${}",
  guilds: "/guilds",
  guild_channels: "/guilds/${}/channels",
  register: "/auth/register",
  login: "/auth/login",
  me: "/users/@me",
  home: "/channels/@me",
  upload_avatar: "/@me/profile/avatar",
  guild_icons: "/icons/${}/${}",
  attachments: "/attachments/${}/${}/${}",
  user_avatars: "/avatars/${}/${}"
};
export const routeArray = Object.values(routes)
