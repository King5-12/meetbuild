const execa = require('execa');
const { BACK_PATH } = require("./constant")
const ora = require('ora');
const stringRandom = require('string-random');

dockerName = ""
const spinner = ora();

const refreshDockerName = () => {
    dockerName = stringRandom()
}

const buildBack = async () => {
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
            cwd: BACK_PATH,
        });
        refreshDockerName()
        spinner.succeed();
    } else {
        refreshDockerName()
    }

    spinner.start(`开始构建镜像`);
    await execa('docker', [
        'build',
        '-t',
        'meetback',
        '.',
    ], {
        cwd: BACK_PATH,
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
        cwd: BACK_PATH,
    });
    spinner.succeed();
}

module.exports = buildBack;