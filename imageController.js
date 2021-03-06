const axios = require("axios");
const sharp = require("sharp");
const Jimp = require("jimp"); //for image manipulation
const fs = require("fs");
const fsPromises = fs.promises;

async function saveImage(name, url) {
  const { data } = await axios.get(url, {
    responseType: "arraybuffer",
  });

  // converting to image file, to save locally
  await sharp(data).resize(100, 100).toFile(`./images/${name}.png`);
}

async function createBanner() {
  const banner = await Jimp.read("./banner.jpeg");
  const files = await fsPromises.readdir("./images");

  let index = 1;
  for (const avatar of files) {
    const imgPath = `./images/${avatar}`;
    const img = await Jimp.read(imgPath);

    const position = 475 + index * (100 + 10);
    banner.composite(img, position, 380);
    index++;
  }
  await banner.writeAsync("./final.png");
}

module.exports = { saveImage, createBanner };
