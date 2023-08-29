"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const [jobId, inputDir, outputDir] = process.argv.slice(2);

let count = 0;
let sum = 0;
let lineNumber = 1;

const errors = [];

const stream = fs.createReadStream(
  path.join(inputDir, `input-${jobId}.dat`),
  "utf-8"
);

const reader = readline.createInterface({ input: stream });

reader.on("line", (line) => {
  const number = Number(line.trim());

  if (!Number.isNaN(number)) {
    count++;
    sum += number;
  } else {
    errors.push(
      `input-${jobId}.dat#L${lineNumber}: "${line}" can't be converted to a number.`
    );
  }

  lineNumber++;
});

reader.on("close", () => {
  fs.writeFileSync(
    path.join(outputDir, `output-${jobId}.dat`),
    (count > 0 ? `${count},${sum / count}` : "") + "\r\n",
    "utf-8"
  );

  if (errors.length > 0) {
    fs.writeFileSync(
      path.join(outputDir, `error.json`),
      JSON.stringify({ errors }),
      "utf-8"
    );
  }
});
