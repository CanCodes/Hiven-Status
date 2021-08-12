require("dotenv").config();
import { createCanvas, registerFont, loadImage } from "canvas";

interface Callback {
  (buffer: string): void
}

async function createImage(songName: string, songArtist: string, cb: Callback) {
  const canvas = createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  registerFont("../assets/code/Roboto-Regular.ttf", {
    family: "Roboto",
  });
  registerFont("../assets/code/Roboto-Medium.ttf", {
    family: "RobotoM",
  });
  ctx.imageSmoothingEnabled = false;

  const background = await loadImage("../assets/user/background.png");
  ctx.drawImage(background, 0, 0);

  // Draw StatusBar
  const statusBar = await loadImage("../assets/code/StatusBar.png");
  ctx.drawImage(statusBar, 55, 89);
  // Write Status
  ctx.font = '24px "RobotoM"';
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Now Playing:", 247, 146);
  ctx.fillText(
    `by ${songArtist.substring(0, 30)}${songArtist.length > 30 ? "..." : ""}`,
    247,
    216
  );

  ctx.font = '36px "Roboto"';
  ctx.fillText(
    `${songName.substring(0, 30)}${songName.length > 30 ? "..." : ""}`,
    247,
    186
  );
  const buffer = canvas.toDataURL("image/png");

  cb(buffer);
}

async function createBlank(cb: Callback) {
  const background = await loadImage("../assets/user/background.png");
  const canvas = createCanvas(
    background.naturalWidth,
    background.naturalHeight
  );
  const ctx = canvas.getContext("2d");
  ctx.drawImage(background, 0, 0);
  const buffer = canvas.toDataURL("image/png");
  cb(buffer);
}

export {
  createImage,
  createBlank,
};
