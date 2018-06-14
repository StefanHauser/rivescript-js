// Generated by CoffeeScript 2.0.0
var TestCase;

TestCase = require("./test-base");

//###############################################################################
// Substitution Tests
//###############################################################################
exports.test_substitutions = async function(test) {
  var bot;
  bot = new TestCase(test, "+ whats up\n- nm.\n\n+ what is up\n- Not much.");
  await bot.reply("whats up", "nm.");
  await bot.reply("what's up?", "nm.");
  await bot.reply("what is up?", "Not much.");
  bot.extend("! sub whats  = what is\n! sub what's = what is");
  await bot.reply("whats up", "Not much.");
  await bot.reply("what's up?", "Not much.");
  await bot.reply("What is up?", "Not much.");
  return test.done();
};

exports.test_person_substitutions = async function(test) {
  var bot;
  bot = new TestCase(test, "+ say *\n- <person>");
  await bot.reply("say I am cool", "i am cool");
  await bot.reply("say You are dumb", "you are dumb");
  bot.extend("! person i am    = you are\n! person you are = I am");
  await bot.reply("say I am cool", "you are cool");
  await bot.reply("say You are dumb", "I am dumb");
  return test.done();
};
