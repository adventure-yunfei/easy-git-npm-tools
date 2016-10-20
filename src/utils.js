import child_process from 'child_process';

export function execCmd(cmd) {
    cmd += ' 2>&1';
    return new Promise((resolve, reject) => {
        const cp = child_process.exec(cmd, function (err, stdout) {
            if (err) {
                reject(`#CMD#: ${cmd}\n` + stdout);
            } else {
                resolve(stdout);
            }
        });
    });
}

export function sequencePromises(promiseGenerators) {
    let result = Promise.resolve();
    promiseGenerators.forEach(promiseGen => {
        result = result.then(promiseGen);
    });
    return result;
}

export function negativePromise(promise) {
    return new Promise((resolve, reject) => {
        promise.then(reject, resolve);
    });
}
