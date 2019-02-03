#! /usr/bin/env node

const program  = require('commander');
const download = require('download-git-repo');
const chalk    = require('chalk');
const ora      = require('ora');
const snlog    = require('../lib/sntools/log').snlog;
var colors     = require('colors/safe');

program
  .version('0.1.0')
  .option('-i, --init [project]', 'init project')
  .option('-g, --git [link]', 'git download, only git link')
  .on('option:git', function (link) {

    if (link.indexOf('github') === -1) {
      console.log('not git url');
      process.exit(1);
      return;
    }

    const spinner = ora('downloading ...').start();
    // https://github.com/stone0117/stone-template
    // https://github.com/stone0117/stone-template.git
    // https://github.com/stone0117/stone-template.git
    const regex = /https:\/\/github.com\/(.*)\/(.*)(.git|\/)?/s;

    let m = regex.exec(link);

    if (m.length >= 3) {
      let owner = m[1];
      let name  = m[2];
      download(`github:${owner}/${name}#master`, name, function (err) {
        if (err) {
          // console.log(err);
          spinner.fail(err);
        } else {
          spinner.succeed('succeed');
        }
      });
    }
  })
  .on('option:init', function (project) {
    const spinner = ora('download template ...').start();
    download('stone0117/stone-template#master', project, function (err) {
      if (err) {return console.log(err);}
      spinner.succeed('succeed');
    });
  })
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp(make_red);
}

function make_red (txt) {
  return colors.red(txt); //display the help text in red on the console
}
