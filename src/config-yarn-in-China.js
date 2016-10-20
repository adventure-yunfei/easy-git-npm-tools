import _ from 'lodash';
import {NPM_CONFIG} from './config-npm-in-China';
import {execCmd, sequencePromises} from './utils';

// 拷贝一份npm配置到yarn配置中，使得用yarn安装包时也能正常工作

function setupYarnConfig(key, val) {
    return execCmd(`yarn config set ${key} "${val}"`)
        .then(() => console.log(`  已设置yarn变量: ${key}=${val}`));
}

export default function configNpmInChina() {
    return execCmd('yarn --version')
        .then(() => {
            console.log('# 配置 yarn: #');
            return sequencePromises(_.map(NPM_CONFIG, (val, key) => () => setupYarnConfig(key, val)));
        }, () => {
            console.log('# 配置 yarn: # 未安装, 跳过.');
        });
}