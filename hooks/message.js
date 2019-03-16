const fs = require('fs');
const { promisify } = require('util');
const { spawn } = require('child_process');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const run = async(command, options = []) => {
    return new Promise((resolve, reject) => {
        const process = spawn(command, options);
        const result = {};

        process.stdout.on('data', data => {
            result.data = data.toString();
        });

        process.stderr.on('data', data => {
            return reject(data.toString());
        });

        process.on('close', code => {
            result.message = `${command} exited with code ${code}`;

            return resolve(result);
        });
    });
};

const getBranchName = async() => {
    const branchName = await run('git', ['rev-parse', '--abbrev-ref', 'HEAD']);

    return branchName.data.trim();
};

const transformMessage = async message => {
    const lines = message.split('\n');
    let firstLine = lines.shift();
    const branchName = await getBranchName();

    if (!firstLine.includes(`[${branchName}]`)) {
        firstLine = `[${branchName}] ${firstLine}`;
    }
    lines.unshift(firstLine);

    return lines.join('\n');
};

const parseFile = async filePath => {
    try {
        const data = await readFile(filePath);
        const message = await transformMessage(data.toString());

        await writeFile(filePath, message);
    }
    catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = {
    parseFile
};
