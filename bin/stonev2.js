#! /usr/bin/env node

const program  = require('commander');
const download = require('download-git-repo');
const chalk    = require('chalk');
const ora      = require('ora');
const snlog    = require('../lib/sntools/log').snlog;
var colors     = require('colors/safe');

program
  .version('0.1.0')
  .command('rm <dir>')
  .option('-r, --recursive', 'Remove recursively')
  .action(function (dir, cmd) {
    console.log('remove ' + dir + (cmd.recursive ? ' recursively' : ''));
  })
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp(make_red);
}

function make_red (txt) {
  return colors.red(txt); //display the help text in red on the console
}
