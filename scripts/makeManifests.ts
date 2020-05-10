import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const copy = () => {
  const manifest = `{
        "name": "ES埋めったー",
        "version": "1.0",
        "description": "ES書きたく無いにゃああああああああああああ",
        "permissions": ["declarativeContent", "storage", "tabs"],
        "browser_action": {
            "default_popup": "popup.html",
            "default_icon": {
                "16": "images/favicon-16x16.png",
                "32": "images/favicon-32x32.png"
            },
            "default_icon": "images/android-chrome-512x512.png"
        },
        "background": {
          "scripts":[
            "background.js"
          ],
          "persistent": false
        },
        "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
        "icons": {
            "16": "images/favicon-16x16.png",
            "32": "images/favicon-32x32.png"
        },
        "manifest_version": 2
    }`;

  fs.mkdir(path.join(__dirname, `../${process.env.DIST_DIR}`), () => {
    fs.writeFile(
      path.join(__dirname, `../${process.env.DIST_DIR}/manifest.json`),
      manifest,
      (err) => {
        if (err) {
          throw err;
        }
        fs.mkdir(path.join(__dirname, `../${process.env.DIST_DIR}/images`), () => {
          [
            "favicon-16x16.png",
            "favicon-32x32.png",
            "android-chrome-512x512.png",
          ].map((img) => {
            fs.copyFile(
              path.join(__dirname, `../src/assets/${img}`),
              path.join(__dirname, `../${process.env.DIST_DIR}/images/${img}`),
              (err) => {
                if (err) throw err;
                console.log(
                  "\u001b[32m" +
                    "Yay✌️, preparation of manifest.json file was completed !!" +
                    "\u001b[0m"
                );
              }
            );
          });
        });
      }
    );
  });
};

copy();
