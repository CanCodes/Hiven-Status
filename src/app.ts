require("dotenv").config();
import axios from "axios";
import WebSocket from "ws";
import { createImage, createBlank } from "./createImage";

const connection = new WebSocket("wss://api.lanyard.rest/socket");

function patchHiven(img: string) {
  axios.patch("https://api.hiven.io/v1/users/@me", {
    body: JSON.stringify({ header: `${img}` }),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.TOKEN,
    },
  });
}

function patchHivenAndQuit(img: string) {
  axios.patch("https://api.hiven.io/v1/users/@me", {
    body: JSON.stringify({ header: `${img}` }),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.TOKEN,
    },
  }).then((_res) => {
    process.exit();
  });
}

connection.onopen = (_event) => {
  connection.send(
    JSON.stringify({
      op: 2,
      d: { subscribe_to_ids: [process.env.USER_ID] },
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
  const d = JSON.parse(JSON.stringify(data));
  switch (d.t) {
    case "PRESENCE_UPDATE":
      const data = d.d;
      if (data.spotify) {
        console.log(`Listening to ${data.spotify.song}`);
        createImage(
          data.spotify.song,
          data.spotify.artist.split("; ")[0],
          patchHiven
        );
      } else {
        console.log(`Not Listening anything.`);

        createBlank(patchHiven);
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
