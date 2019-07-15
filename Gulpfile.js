
const gulp = require('gulp');
const exec = require('child_process').exec;

const dockerBuildCmd = 'npm run docker:build';

function buildBackend(cb) {
    // Run the npm docker build command
    //process.chdir('kitchenman-backend');
    exec(`cd kitchenman-backend && ${dockerBuildCmd}`, (error, stdout, stderr) => {
        //console.log(stdout);
        //console.log(stderr);
        cb(error);
    });
}

function buildFrontend(cb) {
    // Run the npm docker build command for the frontend
    //process.chdir('kitchenman-frontend');
    exec(`cd kitchenman-frontend && ${dockerBuildCmd}`, (error, stdout, stderr) => {
        //console.log(stdout);
        //console.log(stderr);
        cb(error);
    });
}

function buildGateway(cb) {
    // Run the gateway bulid command
    exec('./docker-build.sh', (error, stdout, stderr) => {
        //console.log(stdout);
        //console.log(stderr);
        cb(error);
    });
}

exports.buildBackend = buildBackend;
exports.buildFrontend = buildFrontend;
exports.buildGateway = buildGateway;

exports.build = gulp.parallel(buildBackend, buildFrontend, buildGateway);

exports.default = exports.build;
