const { spawn } = require("child_process");
const argv = process.argv;

if (argv.length !== 4) {
    console.log("the process must have 4 param but " + argv.length + " found");
    process.exit(1);
}
console.log("cd ./" + argv[2]);

argv[2].split(",").forEach(function(location, locationIndex) {
    argv[3].split(",").forEach(function(cmd, cmdIndex) {
        const ls = spawn("cd && cd ./" + location + " && npm run " + cmd, [], { shell: true, env: { FORCE_COLOR: true } });

        ls.stdout.setEncoding("utf8");
        ls.stdout.on("data", data => {
            data = data.replaceAll("\n", "\n[" + location + "   " + cmd + "] ");
            process.stdout.write(data);
        });

        ls.stderr.on("data", data => {
            data = data.toString().replaceAll("\n", "\n[" + location + "   " + cmd + "] ");
            process.stderr.write(data);
        });

        ls.on("error", error => {
            const data = error.message.replaceAll("\n", "\n[" + location + "   " + cmd + "] ");
            process.stderr.write(data);
        });

        ls.on("close", code => {
            console.log(`${location}   ${cmd}] outCode: ${code}`);
        });
    });
});
