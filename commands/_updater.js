/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : XLICON-MD
 * @author : salmanytofficial <https://github.com/salmanytofficial/XLICON-MD>
 * @description : XLICON,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

const DB = require('../lib/scraper');
const { execSync } = require('child_process');
const { tlang, Config, prefix, cmd } = require('../lib');

cmd({
    pattern: "update",
    desc: "Shows repo's refreshed commits.",
    category: "misc",
    filename: __filename
},
async (Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply('This command is only for my owner');

    try {
        citel.reply("Fetching updates... Please wait.");

        let commits = await DB.syncgit();
        if (commits.total === 0) {
            citel.reply(`Hey ${citel.pushName}. You have the latest version installed.`);
        } else {
            citel.reply("Updating... This may take a moment.");
            let update = await DB.sync();
            citel.reply("Update completed successfully.");
        }
    } catch (error) {
        console.error("Update error:", error);
        citel.reply("An error occurred during the update. Please try again later.");
    }
});

