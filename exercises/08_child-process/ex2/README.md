Let's set our exit code to 1 via `process.exitCode = 1`.
<!--
async function main() {
    var child = childProc.spawn("node", ["ex2-child.js"]);
    child.on("exit", function(code) {
        console.log("Child finished : ", code);
    });
    process.exitCode = 1;
}
-->


<!-- TERMINAL -->
> node ex2.js

<!-- OUTPUT:
  Child finished :  1
-->
