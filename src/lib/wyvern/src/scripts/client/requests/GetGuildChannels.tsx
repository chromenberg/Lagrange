import { apiURL } from "../Routes";

const populate = (await import("../../core/SetPlaceholders")).populate;
const routes = (await import("../Routes")).routes;
const validateResponse = (await import("./ValidateResponse")).validateResponse;

type A = {
  name: string;
  id: string;
  type: "text" | "voice";
};

export function getGuildChannels(token: string, id: string): Promise<A[]> {
  return new Promise((res) => {
    fetch(apiURL+populate(routes.guild_channels, id), {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }).then((data) => {
      data.json().then((jsonData) => {
        // If there was an error returned by the API then dont continue further
        if (validateResponse(jsonData)) {
          res(jsonData.message);
          return;
        }

        res(jsonData);
      });
    });
  });
}
