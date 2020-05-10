import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const copy = () => {
  const manifest = `{
        "name": "RxnikkeiAutoVideoViewer",
        "version": "1.0",
        "description": "Build an Extension!",
        "content_scripts": [
          {
            "matches": ["https://www.nikkei.com/article/*/"],
            "js": ["content.js"]
          }
        ],
        "page_action": {
            "default_icon": {
                "16": "images/favicon-16x16.png",
                "32": "images/favicon-32x32.png",
            }
        }
        "background": {
          "scripts":[
            "background.js"
          ]
        },
        "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
        "page_action":{
          "default_icon": "images/android-chrome-512x512.png.png"
        },
        "icons": {
            "16": "images/favicon-16x16.png",
            "32": "images/favicon-32x32.png",
        }
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
        fs.mkdir(path.join(__dirname, `../${process.env.DIST_DIR}`), () => {
          [
            "favicon-16x16.png",
            "favicon-32x32.png",
            "android-chrome-512x512.png",
          ].map((img) => {
            fs.copyFile(
              path.join(__dirname, `../src/assets/${img}`),
              path.join(__dirname, `../${process.env.DIST_DIR}/${img}`),
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
