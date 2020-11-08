from rivescript import RiveScript
import requests
url = 'https://api.covid19api.com/country/germany?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z'
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
	
	if msg == 'Corona':
		response = requests.get(url)
		print(response.json())
	else:
		print('Bot>'+bot.reply('local user', msg))