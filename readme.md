# Nexus Chatbot Demo with Botkit

WexEX chatbot to monitor the Cisco Nexus switch devices with NXOS...
This chatbot is based on Botkit (https://botkit.ai/).

## Requirements

1. ngrok (https://ngrok.com/download)
2. nodejs (https://nodejs.org/en/download/)
3. Nexus switch with `nxapi` feature enabled (https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus9000/sw/6-x/programmability/guide/b_Cisco_Nexus_9000_Series_NX-OS_Programmability_Guide/b_Cisco_Nexus_9000_Series_NX-OS_Programmability_Guide_chapter_011.html#concept_9EB6BD38857C4AF7A3DF685DCCBF7552)


## How to run a chatbot

1. Clone the repository with `git clone <repository Url>` command
2. Create a WebEx bot on https://developer.webex.com/my-apps/.
3. Copy the Access Token with the bot you just created.
4. open the `.env` file on the project root directory.
5. update `ACCESS_TOKEN` value on `.env` file.
6. Generate the public url with `ngrok http 3000` command.
7. Update `PUBLIC_ADDRESS` value on `.env` file. And save the file.
8. Install the required modules with `npm install` command.
9. Run the bot with `npm start` command.


<!-- 
This is a Botkit starter kit for webex, created with the [Yeoman generator](https://github.com/howdyai/botkit/tree/master/packages/generator-botkit#readme).

To complete the configuration of this bot, make sure to update the included `.env` file with your platform tokens and credentials.

[Botkit Docs](https://botkit.ai/docs/v4)

This bot is powered by [a folder full of modules](https://botkit.ai/docs/v4/core.html#organize-your-bot-code). 
Edit the samples, and add your own in the [features/](features/) folder.
-->
