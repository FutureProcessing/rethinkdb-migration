const path = require('path');

function task(rootDirectory) {
    return {
        options: {
            configFile: path.join(rootDirectory, 'grunt', 'eslint.json'),
            outputFile: path.join(rootDirectory, 'grunt', 'var', 'eslint.xml'),
            format: 'junit',
            quiet: true
        },
        src: [
            path.join(rootDirectory, 'src'),
            path.join(rootDirectory, 'test')
        ]
    };
}

module.exports = task;
