const fs = require("fs");
const path = require("path");

// чтение ваших адрессов из addresses.txt
const addressesPath = path.join(__dirname, "resources", "addresses.txt");
const addresses = fs
  .readFileSync(addressesPath, "utf-8")
  .split("\n")
  .map((line) => line.trim());

// чтение кошельков-сибилов
const sybilListPath = path.join(__dirname, "resources", "sybil_wallets.txt");
const sybilWallets = new Set(
  fs
    .readFileSync(sybilListPath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
);

// Все сибил-кошельки отобразяться в result.txt
const resultFilePath = path.join(__dirname, "resources", "result.txt");
const resultStream = fs.createWriteStream(resultFilePath, {
  encoding: "utf-8",
});

addresses.forEach((address) => {
  if (sybilWallets.has(address)) {
    resultStream.write(address + "\n");
  }
});

resultStream.end();
