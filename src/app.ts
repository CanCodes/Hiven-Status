require("dotenv").config();
import axios from "axios";
import WebSocket from "ws";
import { createImage, createBlank, Status } from "./createImage";
import apps from "./apps.json";

const connection = new WebSocket("wss://api.lanyard.rest/socket");

interface LanyardStatus {
  state: string;
  name: string;
  details: string;
}

interface App {
  topText: string;
  midText: string;
  botText: string;
  iconName: string;
}

/**
 * @description Checks if the app is registered in apps.json
 */
function getApp(name: string): App | boolean {
  //@ts-ignore
  const app = apps[name];

  if (!app) return false;
  return app as App;
}

/**
 * @description replaces brackets with proper data for the final image creation.
 */
function prepareStatus(data: LanyardStatus, app: any): Status {
  return {
    topText: app.topText
      .replace("{name}", data.name)
      .replace("{state}", data.state)
      .replace("{details}", data.details),
    midText: app.midText
      .replace("{name}", data.name)
      .replace("{state}", data.state)
      .replace("{details}", data.details),
    botText: app.botText
      .replace("{name}", data.name)
      .replace("{state}", data.state)
      .replace("{details}", data.details),
    iconDir: app.iconName,
  };
}

function patchHiven(img: string) {
  axios.patch(
    "https://api.hiven.io/v1/users/@me",
    { header: `${img}` },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.TOKEN,
      },
    }
  );
}

function patchHivenAndQuit(img: string) {
  axios
    .patch(
      "https://api.hiven.io/v1/users/@me",
      { header: `${img}` },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.TOKEN,
        },
      }
    )
    .then((_res) => {
      process.exit();
    });
}

connection.onopen = (_event) => {
  connection.send(
    JSON.stringify({
      op: 2,
      d: { subscribe_to_id: process.env.USER_ID },
    })
  );
  setInterval(() => {
    connection.send(
      JSON.stringify({
        op: 3,
      })
    );
  }, 30000);
};

connection.onmessage = ({ data }) => {
  //@ts-ignore
  const d = JSON.parse(data);
  switch (d.t) {
    case "PRESENCE_UPDATE":
    case "INIT_STATE":
      const data = d.d;
      data.activities = data.activities.filter(
        (activity: any) => activity.type != 4
      );
      if (data.spotify) {
        console.log(`Listening to ${data.spotify.song} on Spotify`);

        const appData = getApp("Spotify");
        createImage(
          prepareStatus(
            {
              name: data.spotify.song,
              state: data.spotify.artist,
              details: "",
            },
            appData
          ),
          patchHiven
        );
      } else {
        const activity = data.activities?.[0] as LanyardStatus;
        const appData = getApp(activity?.name);
        if (!appData) {
          createBlank(patchHiven);
          console.log("Not doing anything.");
        } else {
          const status = prepareStatus(activity, appData);
          createImage(status, patchHiven);
          console.log(status.topText);
        }
      }
      break;
  }
};

[
  "SIGHUP",
  "SIGINT",
  "SIGQUIT",
  "SIGILL",
  "SIGTRAP",
  "SIGABRT",
  "SIGBUS",
  "SIGFPE",
  "SIGUSR1",
  "SIGSEGV",
  "SIGUSR2",
  "SIGTERM",
].forEach((sig) => {
  process.on(sig, async () => {
    createBlank(patchHivenAndQuit);
  });
});
