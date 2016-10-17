import _ from 'lodash';
import setOsEnv from 'os-env-setter/lib/index';
import {execCmd, sequencePromises} from './utils';

const NPM_CONFIG = {
    'registry': 'https://registry.npm.taobao.org',
    'disturl': 'https://npm.taobao.org/dist'
};

const NPM_ENV = {
    'SASS_BINARY_SITE': 'https://npm.taobao.org/mirrors/node-sass',
    'ELECTRON_MIRROR': 'https://npm.taobao.org/mirrors/electron/'
};

function setupNpmConfig(configName) {
    const val = NPM_CONFIG[configName];
    return execCmd(`npm config set ${configName} "${val}"`)
        .then(() => console.log(`  已设置npm变量: ${configName}=${val}`));
}

function setupNpmEnvs() {
    return sequencePromises(_.map(NPM_ENV, (val, key) => () => execCmd(`export "${key}"="${val}"`)))
        .then(() => {
            return setOsEnv(NPM_ENV, {log: false})
                .then(writtenEnvs => {
                    if (writtenEnvs.length) {
                        writtenEnvs.forEach(({key, value}) => {
                            console.log(`  已设置环境变量: ${key}=${value}`);
                        });
                    }
                });
        });
}

function hasNpmInstalled() {
    return execCmd('npm -v')
        .catch(() => {
            return Promise.reject('npm 未安装.');
        });
}

export default function configNpmInChina() {
    return hasNpmInstalled()
        .then(() => {
            return sequencePromises(
                _.map(NPM_CONFIG, (val, key) => () => setupNpmConfig(key))
                .concat(setupNpmEnvs)
            );
        });
}
