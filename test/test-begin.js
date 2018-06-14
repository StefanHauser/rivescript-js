// Generated by CoffeeScript 2.0.0
var TestCase;

TestCase = require("./test-base");

//###############################################################################
// BEGIN Block Tests
//###############################################################################
exports.test_no_begin_block = function(test) {
  var bot;
  bot = new TestCase(test, "+ hello bot\n- Hello human.");
  bot.reply("Hello bot", "Hello human.");
  return test.done();
};

exports.test_simple_begin_block = function(test) {
  var bot;
  bot = new TestCase(test, "> begin\n    + request\n    - {ok}\n< begin\n\n+ hello bot\n- Hello human.");
  bot.reply("Hello bot.", "Hello human.");
  return test.done();
};

exports.test_blocked_begin_block = function(test) {
  var bot;
  bot = new TestCase(test, "> begin\n    + request\n    - Nope.\n< begin\n\n+ hello bot\n- Hello human.");
  bot.reply("Hello bot.", "Nope.");
  return test.done();
};

exports.test_conditional_begin_block = async function(test) {
  var bot;
  bot = new TestCase(test, "> begin\n    + request\n    * <get met> == undefined => <set met=true>{ok}\n    * <get name> != undefined => <get name>: {ok}\n    - {ok}\n< begin\n\n+ hello bot\n- Hello human.\n\n+ my name is *\n- <set name=<formal>>Hello, <get name>.");
  await bot.reply("Hello bot.", "Hello human.");
  bot.uservar("met", "true");
  bot.uservar("name", "undefined");
  await bot.reply("My name is bob", "Hello, Bob.");
  bot.uservar("name", "Bob");
  await bot.reply("Hello Bot", "Bob: Hello human.");
  return test.done();
};
