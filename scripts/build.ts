import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";
import ora from "ora";
import { $ } from "bun";

const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([a-zA-Z]:)/, '$1');
const rootDir = path.resolve(__dirname, "..");

const sepLength = "Root directory:".length + rootDir.length;
const startTime = new Date();

console.log("Building...");
console.log("Root directory:", rootDir);
console.log("-".repeat(sepLength));

const distDir = path.resolve(rootDir, "distribution");
const coreDir = path.resolve(rootDir, "source", "core");
const compiledCoreDir = path.resolve(rootDir, "source", "core", "pkg");

const spinnerTs = ora("Compiling TypeScript...");
const spinnerCore = ora("Compiling Rust core...");
const spinnerCheck = ora("Checking for Rust core output...");
const spinnerCopy = ora("Copying core output to distribution...");

(async () => {
    try {
        spinnerTs.start("Compiling TypeScript...");
        await $`bun tsc`.cwd(rootDir);
        spinnerTs.succeed("TypeScript compiled successfully.");
    } catch (error) {
        spinnerTs.fail("Error compiling TypeScript.");
    }

    try {
        spinnerCore.start("Compiling Rust core...");
        await $`wasm-pack build --target nodejs 2>NUL`.cwd(coreDir);
        spinnerCore.succeed("Rust core compiled successfully.");
    } catch (error: any) {
        spinnerCore.fail("Error compiling Rust core.");
        process.exit(1);
    }

    try {
        spinnerCheck.start("Checking for Rust core output...");
        if (!fs.existsSync(compiledCoreDir)) {
            spinnerCheck.fail("Rust core output not found.");
            process.exit(1);
        }
        spinnerCheck.succeed("Rust core output found.");
    } catch (error: any) {
        spinnerCheck.fail("Error checking for Rust core output.");
        console.error(error.message);
        process.exit(1);
    }

    try {
        spinnerCopy.start("Copying core output to distribution...");

        const newDistDir = path.resolve(distDir, "core");
        if (!fs.existsSync(newDistDir)) {
            fs.mkdirSync(newDistDir, { recursive: true });
        }
        
        fs.copyFileSync(path.resolve(compiledCoreDir, "core_bg.wasm"), path.resolve(newDistDir, "core_bg.wasm"));
        fs.copyFileSync(path.resolve(compiledCoreDir, "core_bg.wasm.d.ts"), path.resolve(newDistDir, "core_bg.wasm.d.ts"));
        fs.copyFileSync(path.resolve(compiledCoreDir, "core.d.ts"), path.resolve(newDistDir, "core.d.ts"));
        fs.copyFileSync(path.resolve(compiledCoreDir, "core.js"), path.resolve(newDistDir, "core.js"));
        spinnerCopy.succeed("Core output copied to distribution.");
    } catch (error: any) {
        spinnerCopy.fail("Error copying core output to distribution.");
        console.error(error.message);
        process.exit(1);
    }

    console.log("-".repeat(sepLength));
    console.log("Build completed successfully in " + timeFormatter(startTime, new Date()) + ".");
    console.log("Distribution directory:", distDir);
    process.exit(0);
})();

function timeFormatter(date: Date, endDate: Date): string {
    const diff = endDate.getTime() - date.getTime();

    const ms = diff % 1000;
    const s = Math.floor(diff / 1000) % 60;
    const m = Math.floor(diff / 60000) % 60;
    const h = Math.floor(diff / 3600000);

    if (h > 0) {
        return `${h}h, ${m}m, ${s}s, and ${ms}ms`;
    } else if (m > 0) {
        return `${m}m, ${s}s, and ${ms}ms`;
    } else if (s > 0) {
        return `${s}s and ${ms}ms`;
    } else if (ms > 0) {
        return `${ms}ms`;
    } else {
        return "0ms";
    }
}