const run_flow = require("./state_machine");

const flowsDir = process.argv[2];
const fs = require("fs");

let id_counter = 0;
let count_files = 0;
let total_time = 0;
let start = new Date();
fs.readdir(flowsDir, (err, files) => {
    if(!err) {
        files.forEach(async file => {
            let flow = require(flowsDir + "/" + file);
            await run_flow(flow, ++id_counter);
            ++count_files;
            if(count_files == files.length) {
                total_time = (new Date() - start);
                console.log("Total flow processing time: " + total_time + "ms");
            }
        });
    } else {
        console.log(err.message);
    }
});