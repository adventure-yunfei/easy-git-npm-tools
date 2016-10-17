#!/usr/bin/env node

import fse from 'fs-extra';
import commander from 'commander';
import shortenGitCmds from './shorten-git-cmds';
import configNpmInChina from './config-npm-in-China';
import {execCmd, sequencePromises} from './utils';

const COMMANDS = [
    {
        name: 'shorten-git-cmd',
        description: 'Shorten git command (e.g. "git commit -m" => "git cm"; "git commit --amend" => "git ca")',
        action: shortenGitCmds
    },
    {
        name: 'config-npm',
        description: 'Config npm usage in China',
        action: configNpmInChina
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

function executeAllCmds() {
    return sequencePromises(COMMANDS.map(cmd => () => {
        console.log(`\n# CMD: ${cmd.name} #`);
        return cmd.action();
    }));
}

COMMANDS.forEach(cmd => {
    commander
        .command(cmd.name)
        .description(cmd.description)
        .action(cmd.action);
});

commander
    .command('*')
    .action(executeAllCmds);

commander.parse(process.argv);


if (!commander.args.length) {
    executeAllCmds();
}