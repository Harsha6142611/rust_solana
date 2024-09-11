const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function testProgram(code) {
    const projectDir = path.join(__dirname, 'tmp', 'user_program');
    const srcDir = path.join(projectDir, 'programs', 'user_program', 'src');

    // Ensure directories and files
    await fs.ensureDir(srcDir);
    await fs.writeFile(path.join(srcDir, 'lib.rs'), code);

    // Write a basic Anchor Cargo.toml if not exists
    const cargoToml = `[workspace]
members = ["programs/user_program"]

[dependencies]
anchor-lang = "0.23.0"`;

    await fs.writeFile(path.join(projectDir, 'Cargo.toml'), cargoToml);

    // Run `anchor test` command
    const testCommand = `cd ${projectDir} && anchor test`;
    return execCommand(testCommand);
}

// Helper to execute shell commands
function execCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject({ success: false, log: stderr });
            }
            resolve({ success: true, log: stdout });
        });
    });
}

module.exports = { testProgram };
