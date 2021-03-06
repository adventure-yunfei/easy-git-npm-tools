import _ from 'lodash';
import {execCmd, negativePromise, sequencePromises} from './utils';

const GIT_SHORT_COMMANDS = {
    co: 'checkout',
    ca: 'commit --amend',
    cm: 'commit -m',
    a: 'add -A',
    st: 'status',
    br: 'branch',
    p: 'pull --ff-only'
};

export default function shortenGitCmds() {
    const shortCmdKeys = _.keys(GIT_SHORT_COMMANDS);
    const ensureAllShortCmdsUnset = () => Promise.all(shortCmdKeys.map(shortCmd => {
        return negativePromise(execCmd(`git config alias.${shortCmd}`));
    }));

    return execCmd('git --version') //ensureAllShortCmdsUnset()
        .then(() => {
            console.log('# 配置 git: #');
            return sequencePromises(_.map(GIT_SHORT_COMMANDS, (longCmd, shortCmd) => () => {
                return execCmd(`git config --global alias.${shortCmd} "${longCmd}"`)
                    .then(() => {
                        console.log(`  已设置Git短命令: ${shortCmd} = ${longCmd}`);
                    });
            }));
        }, () => {
            console.log('# 配置 git: # 未安装, 跳过.');
        });
}
