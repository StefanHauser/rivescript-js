from rivescript import RiveScript
import os.path

file = os.path.dirname(os.path.abspath("__file__"))
brain = os.path.join(file, 'brain')

bot = RiveScript()
bot.load_directory(brain)
bot.sort_replies()

while True:
	msg = str(input('You> '))

	if msg == 'q':
		break
	
	else:
		print('Bot>'+bot.reply('local user', msg))