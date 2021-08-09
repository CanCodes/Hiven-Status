require("dotenv").config();
const { createCanvas, registerFont, loadImage } = require("canvas");

async function createImage(songName, songArtist, cb) {
  const canvas = createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  registerFont("./src/code_assets/Roboto-Regular.ttf", {
    family: "Roboto",
  });
  registerFont("./src/code_assets/Roboto-Medium.ttf", {
    family: "RobotoM",
  });
  ctx.imageSmoothingEnabled = false;

  const background = await loadImage("./src/user_assets/background.png");
  ctx.drawImage(background, 0, 0);

  // Draw StatusBar
  const statusBar = await loadImage("./src/code_assets/StatusBar.png");
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

async function createBlank(cb) {
  const background = await loadImage("./src/user_assets/background.png");
  const canvas = createCanvas(
    background.naturalWidth,
    background.naturalHeight
  );
  const ctx = canvas.getContext("2d");
  ctx.drawImage(background, 0, 0);
  const buffer = canvas.toDataURL("image/png");
  cb(buffer);
}

module.exports = {
  createImage,
  createBlank,
};
