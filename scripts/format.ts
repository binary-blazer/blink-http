import * as path from "node:path";
import * as process from "node:process";
import ora from "ora";
import { $ } from "bun";

const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([a-zA-Z]:)/, '$1');
const rootDir = path.resolve(__dirname, "..");

const sepLength = "Root directory:".length + rootDir.length;
const startTime = new Date();

console.log("Formatting...");
console.log("Root directory:", rootDir);
console.log("-".repeat(sepLength));

const coreDir = path.resolve(rootDir, "core");

const spinnerTs = ora("Formatting TypeScript...");
const spinnerCore = ora("Formatting Rust core...");

(async () => {
    try {
        spinnerTs.start("Formatting TypeScript...");
        await $`bun prettier --write .>NUL`.cwd(rootDir);
        spinnerTs.succeed("TypeScript formatted successfully.");
    } catch (error) {
        spinnerTs.fail("Error formatting TypeScript.");
    }

    try {
        spinnerCore.start("Formatting Rust core...");
        await $`cargo fmt>NUL`.cwd(coreDir);
        spinnerCore.succeed("Rust core formatted successfully.");
    } catch (error: any) {
        spinnerCore.fail("Error formatting Rust core.");
        process.exit(1);
    }

    console.log("-".repeat(sepLength));
    console.log("Formatted successfully in " + timeFormatter(startTime, new Date()) + ".");
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