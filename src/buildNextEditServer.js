const execa = require('execa');
const { BACK_PATH } = require('./constant');
const ora = require('ora');
const stringRandom = require('string-random');

dockerName = '';
const spinner = ora();

const refreshDockerName = () => {
  dockerName = stringRandom();
};

const buildNextEditServer = async () => {
  spinner.start(`更新最新代码`);
  await execa('git', ['pull'], {
    cwd: BACK_PATH,
  });
  spinner.succeed();

  if (dockerName) {
    spinner.start(`开始结束上一个镜像`);
    await execa('docker', ['stop', dockerName], {
      cwd: NEXT_EDIT_PATH,
    });
    refreshDockerName();
    spinner.succeed();
  } else {
    refreshDockerName();
  }

  spinner.start(`开始构建镜像`);
  await execa('docker', ['build', '-t', 'nextEditServer', '.'], {
    cwd: NEXT_EDIT_PATH,
  });
  spinner.succeed();
  spinner.start(`开始发布镜像`);
  await execa(
    'docker',
    ['run', '-p', '3001:3001', '--name', dockerName, '-itd', 'nextEditServer'],
    {
      cwd: BACK_PATH,
    }
  );
  spinner.succeed();
};

module.exports = buildNextEditServer;
