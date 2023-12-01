const fs = require("fs");
console.log("1");
fs.readFile("test.txt", (err, data) => {
  console.log("file:"+data);
});
console.log("2");
