#! /usr/bin/env node

const program  = require('commander');
const download = require('download-git-repo');
const chalk    = require('chalk');
const ora      = require('ora');
const snlog    = require('../lib/sntools/log').snlog;
var colors     = require('colors/safe');

// program
//   .version('0.1.0')
//   .command('rm <dir>')
//   .option('-r, --recursive', 'Remove recursively')
//   .action(function (dir, cmd) {
//     console.log('remove ' + dir + (cmd.recursive ? ' recursively' : ''));
//   })
//   .option('--disable-tty', 'disable tty')
//   .on('option:disable-tty', function () {
//     // do something here
//     console.log('hello world');
//   })
//   .on('command:*', function () {
//     console.log('command command');
//   })
//   .parse(process.argv);

// https://github.com/stone0117/stone-cli

program
  .version('0.1.0')
  .option('-i, --init [project]', 'init project')
  .option('-g, --git [link]', 'git download')
  .on('option:git', function (link) {
    const spinner = ora('downloading ...').start();
    const regex   = /https:\/\/github.com\/(.*)\/(.*)\/?/s;
    let m         = regex.exec(link);
    if (m.length >= 3) {
      let owner = m[1];
      let name  = m[2];
      download(`github:${owner}/${name}#master`, 'my', function (err) {
        if (err) {return console.log(err);}
        spinner.succeed('succeed');
      });
    }
  })
  .on('option:init', function (project) {
    const spinner = ora('download template ...').start();
    download('stone0117/stone-cli#master', project, function (err) {
      if (err) {return console.log(err);}
      spinner.succeed('succeed');
    });
  })
  .parse(process.argv);

