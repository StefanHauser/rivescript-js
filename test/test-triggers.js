// Generated by CoffeeScript 2.0.0
var TestCase;

TestCase = require("./test-base");

//###############################################################################
// Trigger Tests
//###############################################################################
exports.test_atomic_triggers = async function(test) {
  var bot;
  bot = new TestCase(test, "+ hello bot\n- Hello human.\n\n+ what are you\n- I am a RiveScript bot.");
  await bot.reply("Hello bot", "Hello human.");
  await bot.reply("What are you?", "I am a RiveScript bot.");
  return test.done();
};

exports.test_wildcard_triggers = async function(test) {
  var bot;
  bot = new TestCase(test, "+ my name is *\n- Nice to meet you, <star>.\n\n+ * told me to say *\n- Why did <star1> tell you to say <star2>?\n\n+ i am # years old\n- A lot of people are <star>.\n\n+ i am _ years old\n- Say that with numbers.\n\n+ i am * years old\n- Say that with fewer words.");
  await bot.reply("my name is Bob", "Nice to meet you, bob.");
  await bot.reply("bob told me to say hi", "Why did bob tell you to say hi?");
  await bot.reply("i am 5 years old", "A lot of people are 5.");
  await bot.reply("i am five years old", "Say that with numbers.");
  await bot.reply("i am twenty five years old", "Say that with fewer words.");
  return test.done();
};

exports.test_alternatives_and_optionals = async function(test) {
  var bot;
  bot = new TestCase(test, "+ what (are|is) you\n- I am a robot.\n\n+ what is your (home|office|cell) [phone] number\n- It is 555-1234.\n\n+ [please|can you] ask me a question\n- Why is the sky blue?\n\n+ (aa|bb|cc) [bogus]\n- Matched.\n\n+ (yo|hi) [computer|bot] *\n- Matched.");
  await bot.reply("What are you?", "I am a robot.");
  await bot.reply("What is you?", "I am a robot.");
  await bot.reply("What is your home phone number?", "It is 555-1234.");
  await bot.reply("What is your home number?", "It is 555-1234.");
  await bot.reply("What is your cell phone number?", "It is 555-1234.");
  await bot.reply("What is your office number?", "It is 555-1234.");
  await bot.reply("Can you ask me a question?", "Why is the sky blue?");
  await bot.reply("Please ask me a question?", "Why is the sky blue?");
  await bot.reply("Ask me a question.", "Why is the sky blue?");
  await bot.reply("aa", "Matched.");
  await bot.reply("bb", "Matched.");
  await bot.reply("aa bogus", "Matched.");
  await bot.reply("aabogus", "ERR: No Reply Matched");
  await bot.reply("bogus", "ERR: No Reply Matched");
  await bot.reply("hi Aiden", "Matched.");
  await bot.reply("hi bot how are you?", "Matched.");
  await bot.reply("yo computer what time is it?", "Matched.");
  await bot.reply("yoghurt is yummy", "ERR: No Reply Matched");
  await bot.reply("hide and seek is fun", "ERR: No Reply Matched");
  await bot.reply("hip hip hurrah", "ERR: No Reply Matched");
  return test.done();
};

exports.test_trigger_arrays = async function(test) {
  var bot;
  bot = new TestCase(test, "! array colors = red blue green yellow white\n  ^ dark blue|light blue\n\n+ what color is my (@colors) *\n- Your <star2> is <star1>.\n\n+ what color was * (@colors) *\n- It was <star2>.\n\n+ i have a @colors *\n- Tell me more about your <star>.");
  await bot.reply("What color is my red shirt?", "Your shirt is red.");
  await bot.reply("What color is my blue car?", "Your car is blue.");
  await bot.reply("What color is my pink house?", "ERR: No Reply Matched");
  await bot.reply("What color is my dark blue jacket?", "Your jacket is dark blue.");
  await bot.reply("What color was Napoleoan's white horse?", "It was white.");
  await bot.reply("What color was my red shirt?", "It was red.");
  await bot.reply("I have a blue car.", "Tell me more about your car.");
  await bot.reply("I have a cyan car.", "ERR: No Reply Matched");
  return test.done();
};

exports.test_weighted_triggers = async function(test) {
  var bot;
  bot = new TestCase(test, "+ * or something{weight=10}\n- Or something. <@>\n\n+ can you run a google search for *\n- Sure!\n\n+ hello *{weight=20}\n- Hi there!\n\n// Test that spaces before or after the {weight} tag are gobbled up along\n// with the {weight} tag itself.\n\n+ something{weight=100}\n- Weighted something\n\n+ something\n- Unweighted something\n\n+ nothing {weight=100}\n- Weighted nothing\n\n+ nothing\n- Unweighted nothing\n\n+ {weight=100}everything\n- Weighted everything\n\n+ everything\n- Unweighted everything\n\n+ {weight=100}   blank\n- Weighted blank\n\n+ blank\n- Unweighted blank");
  await bot.reply("Hello robot.", "Hi there!");
  await bot.reply("Hello or something.", "Hi there!");
  await bot.reply("Can you run a Google search for Node", "Sure!");
  await bot.reply("Can you run a Google search for Node or something", "Or something. Sure!");
  await bot.reply("something", "Weighted something");
  await bot.reply("nothing", "Weighted nothing");
  await bot.reply("everything", "Weighted everything");
  await bot.reply("blank", "Weighted blank");
  return test.done();
};

exports.test_empty_piped_arrays = async function(test) {
  var bot, errors, expected_errors;
  errors = [];
  expected_errors = ['Syntax error: Piped arrays can\'t begin or end with a | at stream() line 1 near ! array hello = hi|hey|sup|yo| (in topic random)', 'Syntax error: Piped arrays can\'t begin or end with a | at stream() line 2 near ! array something = |something|some thing (in topic random)', 'Syntax error: Piped arrays can\'t include blank entries at stream() line 3 near ! array nothing = nothing||not a thing (in topic random)'];
  console.error = function(text) {
    return errors.push(text);
  };
  bot = new TestCase(test, "! array hello = hi|hey|sup|yo|\n! array something = |something|some thing\n! array nothing = nothing||not a thing\n\n+ [*] @hello [*]\n- Oh hello there.\n\n+ *\n- Anything else?");
  // Check that errors were thrown
  test.deepEqual(errors, expected_errors);
  // We also fix these, so these should also work
  await bot.reply("Hey!", "Oh hello there.");
  await bot.reply("sup", "Oh hello there.");
  await bot.reply("Bye!", "Anything else?");
  await bot.reply("Love you", "Anything else?");
  return test.done();
};

exports.test_empty_piped_alternations = async function(test) {
  var bot, errors, expected_errors;
  errors = [];
  expected_errors = ['Syntax error: Piped alternations can\'t begin or end with a | at stream() line 1 near + [*] (hi|hey|sup|yo|) [*] (in topic random)', 'Syntax error: Piped alternations can\'t begin or end with a | at stream() line 4 near + [*] (|good|great|nice) [*] (in topic random)', 'Syntax error: Piped alternations can\'t include blank entries at stream() line 7 near + [*] (mild|warm||hot) [*] (in topic random)'];
  console.error = function(text) {
    return errors.push(text);
  };
  bot = new TestCase(test, "+ [*] (hi|hey|sup|yo|) [*]\n- Oh hello there.\n\n+ [*] (|good|great|nice) [*]\n- Oh nice!\n\n+ [*] (mild|warm||hot) [*]\n- Purrfect.\n\n+ *\n- Anything else?");
  // Check that errors were thrown
  test.deepEqual(errors, expected_errors);
  // We also fix these, so these should also work
  await bot.reply("Hey!", "Oh hello there.");
  await bot.reply("sup", "Oh hello there.");
  await bot.reply("that's nice to hear", "Oh nice!");
  await bot.reply("so good", "Oh nice!");
  await bot.reply("You're hot!", "Purrfect.");
  await bot.reply("Bye!", "Anything else?");
  await bot.reply("Love you", "Anything else?");
  return test.done();
};

exports.test_empty_piped_optionals = async function(test) {
  var bot, errors, expected_errors;
  errors = [];
  expected_errors = ['Syntax error: Piped optionals can\'t begin or end with a | at stream() line 1 near + bot [*] [hi|hey|sup|yo|] [*] to me (in topic random)', 'Syntax error: Piped optionals can\'t begin or end with a | at stream() line 4 near + dog [*] [|good|great|nice] [*] to me (in topic random)', 'Syntax error: Piped optionals can\'t include blank entries at stream() line 7 near + cat [*] [mild|warm||hot] [*] to me (in topic random)'];
  console.error = function(text) {
    return errors.push(text);
  };
  bot = new TestCase(test, "+ bot [*] [hi|hey|sup|yo|] [*] to me\n- Oh hello there.\n\n+ dog [*] [|good|great|nice] [*] to me\n- Oh nice!\n\n+ cat [*] [mild|warm||hot] [*] to me\n- Purrfect.\n\n+ *\n- Anything else?");
  // Check that errors were thrown
  test.deepEqual(errors, expected_errors);
  // We also fix these, so these should also work
  await bot.reply("Bot say hey to me", "Oh hello there.");
  await bot.reply("bot w hi to me", "Oh hello there.");
  await bot.reply("dog be nice to me", "Oh nice!");
  await bot.reply("Dog don't be good to me", "Oh nice!");
  await bot.reply("Cat should not feel warm to me", "Purrfect.");
  await bot.reply("Bye!", "Anything else?");
  await bot.reply("Love you", "Anything else?");
  return test.done();
};

exports.test_empty_piped_missing_arrays = async function(test) {
  var bot;
  // Test case where an array reference is missing, and check that
  // compiled regexp does not render as accidental wildcard of `||`
  bot = new TestCase(test, "! array test1 = hi|hey|sup|yo\n! array test2 = yes|yeah|yep\n! array test3 = bye|goodbye||byebye\n\n// This trigger has an array reference that does not exist\n// Check that new code prevents accidental double-pipe wildcard match\n// e.g.  /hi|hey|sup|yo||bye|goodbye|byebye/\n// should become  /hi|hey|sup|yo|bye|goodbye|byebye/\n+ [*] (@test2|@test4|@test3) [*]\n- Multi-array match\n\n// Normal array trigger\n+ [*] (@test1) [*]\n- Test1 array match\n");
  // We also fix these, so these should also work
  await bot.reply("Test One: hi", "Test1 array match");
  await bot.reply("Test Two: yeah", "Multi-array match");
  return test.done();
};
