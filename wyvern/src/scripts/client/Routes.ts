export const rootURL = "/api/v1";

export const routes =[
  rootURL+"/channels/${}/messages",
  rootURL+"/channels/${}/messages/${}",
  rootURL+"/guilds",
  rootURL+"/guilds/${}/channels",
  rootURL+"/auth/register"
];
export type Routes = keyof typeof routes
export const RouteTypes = {};
