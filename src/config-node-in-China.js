import _ from 'lodash';
import 'colors';
import setOsEnv from 'os-env-setter';
import {execCmd, sequencePromises} from './utils';

const NODE_ENV = {
    'NVM_NODEJS_ORG_MIRROR': 'http://npm.taobao.org/mirrors/node'
};

function setupNodeEnvs() {
    return sequencePromises(_.map(NODE_ENV, (val, key) => () => execCmd(`export "${key}"="${val}"`)))
        .then(() => {
            return setOsEnv(NODE_ENV)
                .then(({writtenFile, writtenEnvs}) => {
                    if (writtenEnvs.length) {
                        writtenEnvs.forEach(({key, value}) => {
                            console.log(`  已设置环境变量: ${key}=${value}`);
                        });
                    }
                });
        });
}

export default function configNpmInChina() {
    return Promise.resolve()
        .then(() => {
            console.log('# 配置 node: #');
            return setupNodeEnvs();
        });
}
