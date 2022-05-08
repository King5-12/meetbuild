const execa = require('execa');
const { BACK_PATH } = require("./constant")
const ora = require('ora');

let dockerName = ""
const spinner = ora();

const refreshDockerName = () => {
    dockerName = new Date().toString()
}

const buildFront = async () => {
    spinner.start(`更新最新代码`);
    await execa('git', [
        'pull',
    ], {
        cwd: BACK_PATH,
    });
    spinner.succeed();

    if (dockerName) {
        spinner.start(`开始结束上一个镜像`);
        await execa('docker', [
            'stop',
            dockerName
        ], {
            cwd: FRONT_PATH,
        });
        refreshDockerName()
        spinner.succeed();
    }

    spinner.start(`开始构建镜像`);
    await execa('docker', [
        'build',
        '-t',
        'meetback',
        '.',
    ], {
        cwd: FRONT_PATH,
    });
    spinner.succeed();
    spinner.start(`开始发布镜像`);
    await execa('docker', [
        'run',
        '-p',
        '8080:8080',
        '--name',
        dockerName,
        '-itd',
        'meetback',
    ], {
        cwd: FRONT_PATH,
    });
    spinner.succeed();
}

module.exports = buildFront;