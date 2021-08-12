require("dotenv").config();
import { createCanvas, registerFont, loadImage } from "canvas";
import path from "path";

interface Callback {
  (buffer: string): void;
}

interface Status {
  iconDir: string;
  topText: string;
  midText: string;
  botText: string;
}

async function createImage(status: Status, cb: Callback) {
  const canvas = createCanvas(1000, 500);
  const ctx = canvas.getContext("2d");
  registerFont(path.join(process.cwd(), "assets/code/Roboto-Regular.ttf"), {
    family: "Roboto",
  });
  registerFont(path.join(process.cwd(), "assets/code/Roboto-Medium.ttf"), {
    family: "RobotoM",
  });
  ctx.imageSmoothingEnabled = false;

  const background = await loadImage(
    path.join(process.cwd(), "assets/user/background.png")
  );
  const statusBar = await loadImage(
    path.join(process.cwd(), "assets/code/StatusBar.png")
  );
  const icon = await loadImage(
    path.join(process.cwd(), `assets/code/icons/${status.iconDir}`)
  );
  ctx.drawImage(background, 0, 0);

  // Draw StatusBar
  ctx.drawImage(statusBar, 55, 89);
  ctx.drawImage(icon, 84, 107);
  // Write Status
  ctx.font = '24px "RobotoM"';
  ctx.fillStyle = "#ffffff";
  ctx.fillText(status.topText, 247, 146);
  ctx.fillText(
    `${status.botText.substring(0, 30)}${
      status.botText.length > 30 ? "..." : ""
    }`,
    247,
    216
  );

  ctx.font = '36px "Roboto"';
  ctx.fillText(
    `${status.midText.substring(0, 30)}${
      status.midText.length > 30 ? "..." : ""
    }`,
    247,
    186
  );
  const buffer = canvas.toDataURL("image/png");

  cb(buffer);
}

async function createBlank(cb: Callback) {
  const background = await loadImage(
    path.join(process.cwd(), "assets/user/background.png")
  );
  const canvas = createCanvas(
    background.naturalWidth,
    background.naturalHeight
  );
  const ctx = canvas.getContext("2d");
  ctx.drawImage(background, 0, 0);
  const buffer = canvas.toDataURL("image/png");
  cb(buffer);
}

export { createImage, createBlank, Status };
