const populate = (await import("../../core/SetPlaceholders")).populate;
const routes = (await import("../Routes")).routes;
const validateResponse = (await import("./ValidateResponse")).validateResponse;

export function fetchGuildData(token: string, id: string) {
  return new Promise((res) => {
    fetch(populate(routes.guilds, id), {
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
