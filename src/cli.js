#!/usr/bin/env node

import fse from 'fs-extra';
import commander from 'commander';
import 'colors';
import shortenGitCmds from './shorten-git-cmds';
import configNpmInChina from './config-npm-in-China';
import configNodeInChina from './config-node-in-China';
import configYarnInChina from './config-yarn-in-China';
import {execCmd, sequencePromises} from './utils';

const COMMANDS = [
    {
        name: 'shorten-git-cmd',
        description: 'Shorten git command (e.g. "git commit -m" => "git cm"; "git commit --amend" => "git ca")',
        action: shortenGitCmds
    },
    {
        name: 'config-node',
        description: 'Config node usage in China',
        action: configNodeInChina
    },
    {
        name: 'config-npm',
        description: 'Config npm usage in China',
        action: configNpmInChina
    },
    {
        name: 'config-yarn',
        description: 'Config yarn usage in China',
        action: configYarnInChina
    }
].map(cmd => {
    const action = cmd.action;
    cmd.action = () => {
        return action().catch(err => {
            console.log(err);
            return Promise.reject(err);
        });
    };
    return cmd;
});

function onError(err) {
    console.error('# ERROR: #'.red);
    console.log((err.stack || err).toString().red);
    process.exit(1);
}

function executeAllCmds() {
    return sequencePromises(COMMANDS.map(cmd => () => {
        return cmd.action();
    })).catch(onError);
}

COMMANDS.forEach(cmd => {
    commander
        .command(cmd.name)
        .description(cmd.description)
        .action(() => cmd.action().catch(onError));
});

commander
    .command('*')
    .action(executeAllCmds);

commander.parse(process.argv);


if (!commander.args.length) {
    executeAllCmds();
}