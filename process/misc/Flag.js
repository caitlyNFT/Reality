import { message, createDataItemSigner } from "@permaweb/aoconnect";
import { flagged } from "./FlaggedDataBatch4.js";
import fs from "fs";

const key = JSON.parse(
  fs.readFileSync("../.secret/deploy_sqlite_jwk.json", "utf8"),
);

async function main() {
  const signer = createDataItemSigner(key);

  for (const walletId of flagged) {
    const res = await message({
      process: "2dFSGGlc5xJb0sWinAnEFHM-62tQEbhDzi1v5ldWX5k",
      tags: [{ name: "Action", value: "Eval" }],
      data: `FlagWallet("${walletId}")`,
      signer,
    });
    console.log(`${walletId}: ${res}`);
  }
}

main();
