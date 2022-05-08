const execa = require('execa');
const { FRONT_PATH } = require("./constant")
const ora = require('ora');

const spinner = ora();

const buildFront = async () => {
    spinner.start(`更新最新代码`);
    await execa('git', [
        'pull',
    ], {
        cwd: FRONT_PATH,
    });
    spinner.succeed();

    spinner.start(`开始打包`);
    await execa('npm', [
        'run',
        'build',
    ], {
        cwd: FRONT_PATH,
    });
    spinner.succeed();
    spinner.start(`重启nginx`);
    await execa('systemctl', [
        'restart',
        'nginx',
    ], {
        cwd: FRONT_PATH,
    });
    spinner.succeed();

}

module.exports = buildFront;
