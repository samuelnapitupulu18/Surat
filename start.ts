import { spawn } from "child_process";

console.log("Starting surat system...");

// 1. Run migrations to ensure DB is fresh
const migrate = spawn("bun", ["x", "prisma", "db", "push"], {
    cwd: "./apps/api",
    stdio: "inherit",
    shell: true,
});

migrate.on("close", (code) => {
    if (code !== 0) {
        console.error("Migration failed!");
        process.exit(1);
    }

    console.log("Database ready. Starting server...");

    // 2. Start the API (which now serves frontend too)
    const server = spawn("bun", ["run", "src/index.ts"], {
        cwd: "./apps/api",
        stdio: "inherit",
        shell: true,
    });

    server.on("close", (code) => {
        console.log(`Server exited with code ${code}`);
    });
});
