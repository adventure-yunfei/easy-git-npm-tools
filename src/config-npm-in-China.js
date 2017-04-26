import _ from 'lodash';
import 'colors';
import setOsEnv from 'os-env-setter';
import {execCmd, sequencePromises} from './utils';

export const NPM_CONFIG = {
    'registry': 'https://registry.npm.taobao.org',
    'disturl': 'https://npm.taobao.org/dist'
};

const NPM_ENV = {
    'SASS_BINARY_SITE': 'https://npm.taobao.org/mirrors/node-sass',
    'ELECTRON_MIRROR': 'https://npm.taobao.org/mirrors/electron/'
};

function setupNpmConfig(key, val) {
    return execCmd(`npm config set ${key} "${val}"`)
        .then(() => {
            console.log(`  已设置npm变量: ${key}=${val}`)
            if (key === 'registry') {
                console.warn('  # WARN: # 请注意更改了 npm "registry" 之后,  "npm publish" 将会失败.'.yellow);
                console.warn('           (手动设回: --registry https://registry.npmjs.org )'.yellow);
            }
        });
}

function setupNpmEnvs() {
    return setOsEnv(NPM_ENV)
        .then(({writtenFile, writtenEnvs}) => {
            if (writtenEnvs.length) {
                writtenEnvs.forEach(({key, value}) => {
                    console.log(`  已设置环境变量: ${key}=${value}`);
                });
            }
        });
}

export default function configNpmInChina() {
    return execCmd('npm -v')
        .then(() => {
            console.log('# 配置 npm: #');
            return sequencePromises(
                _.map(NPM_CONFIG, (val, key) => () => setupNpmConfig(key, val))
                .concat(setupNpmEnvs)
            );
        }, () => {
            return Promise.reject('# 配置 npm: # 未安装, 跳过.');
        });
}
