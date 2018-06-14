// Generated by CoffeeScript 2.0.0
var TestCase;

TestCase = require("./test-base");

//###############################################################################
// calculation (add,sub) tests
//###############################################################################
exports.test_addition = async function(test) {
  var bot;
  bot = new TestCase(test, "+ test counter\n- <set counter=0>counter set\n\n+ show\n- counter = <get counter>\n\n+ add\n- <add counter=1>adding\n\n+ sub\n- <sub counter=1>subbing\n\n+ div\n- <set counter=10>\n^ <div counter=2>\n^ divving\n\n+ mult\n- <set counter=10>\n^ <mult counter=2>\n^ multing");
  await bot.reply("test counter", "counter set");
  await bot.reply("show", "counter = 0");
  await bot.reply("add", "adding");
  await bot.reply("show", "counter = 1");
  await bot.reply("sub", "subbing");
  await bot.reply("show", "counter = 0");
  await bot.reply("div", "divving");
  await bot.reply("show", "counter = 5");
  await bot.reply("mult", "multing");
  await bot.reply("show", "counter = 20");
  return test.done();
};
