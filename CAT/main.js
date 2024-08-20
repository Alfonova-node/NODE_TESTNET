import a28_0x217498 from "chalk";
import { createSessionDirectory, getAllFilesFromFolder, getSessionDirectory, getUserFromUrl, readJsonFile, runtimeServer, updateBanner, writeToFile } from "./app/utils/helper.js";
import { DIR_PATH_SESSION } from "./app/utils/konst.js";
import a28_0x4a54a7 from "./app/form.js";
import a28_0x4abdd2 from "./app/deleteAccount.js";
import a28_0x78fd47 from "./app/mainMenu.js";
import a28_0x32a6bb from "./app/libs/proxyManager.js";
import a28_0x4e06de from "./app/libs/catizen.js";
import a28_0x8988b1 from "./app/startBot.js";

createSessionDirectory(DIR_PATH_SESSION);

(async () => {
  let v = await runtimeServer();
  if (v.status === "exit") {
    process.stdout.write(updateBanner(v.baner));
    process.exit();
  }
  
  let v2 = 0;
  while (v.status === "reconnecting") {
    v2++;
    process.stdout.write("c");
    process.stdout.write(updateBanner(v.baner));
    console.log(a28_0x217498.yellowBright("Reconnecting ") + a28_0x217498.whiteBright("•".repeat(v2)));
    if (v2 > 4) {
      v2 = 0;
    }
    v = await runtimeServer();
    await new Promise(p => setTimeout(p, 5000));
  }
  
  process.stdout.write("c");
  process.stdout.write(updateBanner(v.baner));

  process.stdout.write("c");
  while (true) {
    const v4 = await a28_0x78fd47(v.baner);
    if (v4 === "exit") {
      process.exit();
    }
    if (v4 === "1") {
      var vGetAllFilesFromFolder2 = getAllFilesFromFolder(DIR_PATH_SESSION);
      let v5 = [];
      for (let v6 = 0; v6 < vGetAllFilesFromFolder2.length; v6++) {
        let v7 = vGetAllFilesFromFolder2[v6];
        if (v7) {
          var vReadJsonFile2 = readJsonFile(v7);
          v5.push(vReadJsonFile2);
        }
      }
      if (vGetAllFilesFromFolder2.length < 1) {
        await a28_0x4a54a7(a28_0x217498.yellowBright("Account is empty, please add account before start bot") + "\n" + a28_0x217498.blackBright("Press Enter To Back"), v.baner);
      } else {
        const v8 = await a28_0x8988b1(v5, v.baner);
        if (v8 === "exit") {
          process.exit();
        }
      }
    }
    if (v4 === "2") {
      const v9 = await a28_0x4a54a7("Enter your init_data", v.baner);
      let v10;
      try {
        v10 = getUserFromUrl(v9);
      } catch (_0x261c15) {
        await a28_0x4a54a7(a28_0x217498.yellowBright("WTF with your input, Check your input moron!") + "\n" + a28_0x217498.blackBright("Press Enter To Back"), v.baner);
        continue;
      }
      let v11 = {
        use_proxy: false,
        proxy_hostname: "",
        proxy_protocol: "socks5",
        proxy_port: 0,
        proxy_username: "",
        proxy_password: ""
      };
      const v12 = new a28_0x4e06de({
        token: "",
        initData: v9
      });
      const v13 = await v12.login();
      if ("code" in v13) {
        if (v13.code === 106) {
          await a28_0x4a54a7(a28_0x217498.redBright("Catizen on Maintenance") + "\n" + a28_0x217498.blackBright("Press Enter To Back"), v.baner);
        }
        if (v13.code === 2) {
          await a28_0x4a54a7(a28_0x217498.redBright("Invalid Credentials, Please Recapture Credentials") + "\n" + a28_0x217498.blackBright("Press Enter To Back"), v.baner);
        }
      } else {
        try {
          const v14 = await a28_0x4a54a7("Do you want to use proxy " + a28_0x217498.whiteBright("?") + " " + a28_0x217498.blackBright("y/n"), v.baner);
          if (v14 === "y" || v14 === "Y") {
            let v15 = true;
            while (v15) {
              const v16 = await a28_0x4a54a7(a28_0x217498.yellowBright("For now we only use socks5 proxy") + "\n\n" + a28_0x217498.white("Enter Hostname or Ip Address"), v.baner);
              const v17 = await a28_0x4a54a7(a28_0x217498.yellowBright("For now we only use socks5 proxy") + "\n\n" + a28_0x217498.white("Enter Port"), v.baner);
              const v18 = await a28_0x4a54a7(a28_0x217498.yellowBright("For now we only use socks5 proxy") + "\n\n" + a28_0x217498.white("Enter Username") + " " + a28_0x217498.blackBright("(leave blank if not sure)"), v.baner);
              const v19 = await a28_0x4a54a7(a28_0x217498.yellowBright("For now we only use socks5 proxy") + "\n\n" + a28_0x217498.white("Enter Password") + " " + a28_0x217498.blackBright("(leave blank if not sure)"), v.baner);
              const v20 = new a28_0x32a6bb({
                host: v16,
                protocol: "socks5",
                port: parseInt(v17),
                username: v18,
                password: v19
              });
              const v21 = await v20.testSpeed("https://ifconfig.me/ip");
              if (v21.status) {
                const vF = p2 => {
                  if (p2 < 100) {
                    return a28_0x217498.greenBright(p2);
                  } else if (p2 >= 100) {
                    return a28_0x217498.yellowBright(p2);
                  } else {
                    return a28_0x217498.redBright(p2);
                  }
                };
                await a28_0x4a54a7("Proxy Connected\n" + a28_0x217498.whiteBright("Latency") + " " + vF(v21.duration) + " " + a28_0x217498.whiteBright("ms") + "\n" + a28_0x217498.blackBright("Press Enter Save Credentials"), v.baner);
                v15 = false;
                v11 = {
                  use_proxy: true,
                  proxy_hostname: v16,
                  proxy_protocol: "socks5",
                  proxy_port: parseInt(v17),
                  proxy_username: v18,
                  proxy_password: v19
                };
                break;
              } else {
                const v22 = await a28_0x4a54a7(a28_0x217498.redBright(v21.message) + "\nDo you want to re enter proxy " + a28_0x217498.whiteBright("?") + " " + a28_0x217498.blackBright("y/n"), v.baner);
                if (v22 === "n" || v22 === "N") {
                  v15 = false;
                  v11 = {
                    use_proxy: false,
                    proxy_hostname: "",
                    proxy_protocol: "socks5",
                    proxy_port: 0,
                    proxy_username: "",
                    proxy_password: ""
                  };
                  break;
                }
              }
            }
          }
          writeToFile(getSessionDirectory(DIR_PATH_SESSION) + "/" + v10.username + ".json", JSON.stringify({
            username: v10.username,
            access_token: "",
            init_data: v9,
            ...v11
          }));
          await a28_0x4a54a7(a28_0x217498.greenBright("Success To Add Login") + "\n" + a28_0x217498.blackBright("Press Enter To Back"), v.baner);
        } catch (_0x48dbfb) {
          await a28_0x4a54a7(a28_0x217498.redBright("Something went wrong") + "\n" + a28_0x217498.blackBright("Press Enter To Back"), v.baner);
          continue;
        }
      }
    }
    if (v4 === "3") {
      try {
        var vGetAllFilesFromFolder2 = getAllFilesFromFolder(DIR_PATH_SESSION);
        let v23 = [];
        for (let v24 = 0; v24 < vGetAllFilesFromFolder2.length; v24++) {
          let v25 = vGetAllFilesFromFolder2[v24];
          if (v25) {
            var vReadJsonFile2 = readJsonFile(v25);
            v23.push({
              name: vReadJsonFile2.username,
              location: v25
            });
          }
        }
        if (v23.length > 0) {
          const v26 = await a28_0x4abdd2(v23, v.baner);
          if (v26 === "exit") {
            process.exit();
          }
        } else {
          await a28_0x4a54a7(a28_0x217498.redBright("Account is empty") + "\n" + a28_0x217498.blackBright("Press Enter To Back"), v.baner);
          continue;
        }
      } catch (_0x5ab3f1) {
        await a28_0x4a54a7(a28_0x217498.redBright("Something went wrong") + "\n" + a28_0x217498.blackBright("Press Enter To Back"), v.baner);
        continue;
      }
    }
  }
})();
