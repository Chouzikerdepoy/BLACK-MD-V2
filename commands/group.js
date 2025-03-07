/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Blade-MD
 * @author : salmanytofficial <https://github.com/Bladeh4x>
 * @description : Bladeh4x,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

const { sck, sck1,cmd, jsonformat, botpic, TelegraPh, RandomXP, Config, tlang, warndb, sleep,getAdmin,getBuffer, prefix } = require('../lib')
const moment = require("moment-timezone");
const fs = require('fs-extra')
const Levels = require("discord-xp");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
//---------------------------------------------------------------------------
cmd({
            pattern: "join",
            desc: "joins group by link",
            category: "owner",
            use: '<group link.>',
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner);
            if (!text) return citel.reply(`Please give me Query ${tlang().greet}`);
            if (!text.split(" ")[0] && !text.split(" ")[0].includes("whatsapp.com"))
                citel.reply("Link Invalid, Please Send a valid whatsapp Group Link!");
            let result = text.split(" ")[0].split("https://chat.whatsapp.com/")[1];
            await Void.groupAcceptInvite(result)
                .then((res) => citel.reply("🟩Joined Group"))
                .catch((err) => citel.reply("Error in Joining Group"));

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "sticker",
            alias: ["s"],
            desc: "Makes sticker of replied image/video.",
            category: "group",
            use: '<reply to any image/video.>',
        },
        async(Void, citel, text) => {
            if (!citel.quoted) return citel.reply(`*Mention any Image or video Sir.*`);
            let mime = citel.quoted.mtype
            pack = Config.packname
            author = Config.author
            if (citel.quoted) {
                let media = await citel.quoted.download();
                citel.reply("*Processing Your request*");
                let sticker = new Sticker(media, {
                    pack: pack, // The pack name
                    author: author, // The author name
                    type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 75, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const buffer = await sticker.toBuffer();
                return Void.sendMessage(citel.chat, {sticker: buffer}, {quoted: citel });
            } else if (/video/.test(mime)) {
                if ((quoted.msg || citel.quoted)
                    .seconds > 20) return citel.reply("Cannot fetch videos longer than *20 Seconds*");
                let media = await quoted.download();
                let sticker = new Sticker(media, {
                    pack: pack, // The pack name
                    author: author, // The author name
                    type: StickerTypes.FULL, // The sticker type
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 70, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const stikk = await sticker.toBuffer();
                return Void.sendMessage(citel.chat, {  sticker: stikk   }, {    quoted: citel });
            } else {
                citel.reply("*Uhh,Please reply to any image or video*");
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
    pattern: "support",
    desc: "Sends official support group link.",
    category: "group",
    filename: __filename,
},
async (Void, citel, text) => {
    citel.reply(`*Check your Pm ${tlang().greet}*`);
    await Void.sendMessage(citel.sender, {
        image: log0,
        caption: `*Group Name: blackmd-Support*\n*Group Link:* https://chat.whatsapp.com/FixEhA9BNH46sYyLOAqCps`,
    });
});

cmd({
    pattern: "warn",
    desc: "Warns user in Group.",
    category: "group",
    filename: __filename,
    use: '<quote|reply|number>',
},
async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply('This Command is only for groups.');
    const groupAdmins = await getAdmin(Void, citel)
    const isAdmin = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmin) return citel.reply('This command is only for Admins.');
    // ... rest of the code
});

cmd({
    pattern: "unblock",
    desc: "Unblocked the quoted user.",
    category: "owner",
    filename: __filename,
},
async (Void, citel, text, { isCreator }) => {
    if (!citel.quoted) return citel.reply("Please reply to a user.");
    if (!isCreator) citel.reply(tlang().owner);
    let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    await Void.updateBlockStatus(users, "unblock")
        .then((res) => console.log(JSON.stringify(res)))
        .catch((err) => console.log(JSON.stringify(err)));
});

cmd({
    pattern: "ujid",
    desc: "Get the JID of all users in a group.",
    category: "owner",
    filename: __filename,
},
async (Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply(tlang().owner)
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    let textt = `_Here is the JID address of all users in_\n *- ${groupMetadata.subject}*\n\n`
    for (let mem of participants) {
        textt += `📍 ${mem.id}\n`;
    }
    citel.reply(textt);
});

    //---------------------------------------------------------------------------
cmd({
        pattern: "tagall",
        desc: "Tags every person of group.",
        category: "group",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
        const participants = citel.isGroup ? await groupMetadata.participants : "";
        const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins) return citel.reply(tlang().admin);

        let textt = `
══✪〘   *Tag All*   〙✪══

➲ *Message :* ${text ? text : "blank"}\n\n
➲ *Author:* ${citel.pushName} 🔖
`
        for (let mem of participants) {
            textt += `📍 @${mem.id.split("@")[0]}\n`;
        }
        Void.sendMessage(citel.chat, {
            text: textt,
            mentions: participants.map((a) => a.id),
        }, {
            quoted: citel,
        });
    }
)

//---------------------------------------------------------------------------
cmd({
            pattern: "request",
            desc: "Sends requst to main Bot developer.",
            category: "group",
            filename: __filename,
            use: '<text>',
        },
        async(Void, citel, text) => {
            if (!text) return reply(`Example : ${
        prefix + command
      } hello dev please add a downloader feature`);
            textt = `*| REQUEST |*`;
            teks1 = `\n\n*User* : @${
    citel.sender.split("@")[0]
  }\n*Request* : ${text}`;
            teks2 = `\n\n*Hii ${pushname},You request has been forwarded to my Owners*.\n*Please wait.......*`;
            for (let i of owner) {
                Void.sendMessage(i + "@s.whatsapp.net", {
                    text: textt + teks1,
                    mentions: [citel.sender],
                }, {
                    quoted: citel,
                });
            }
            Void.sendMessage(citel.chat, {
                text: textt + teks2 + teks1,
                mentions: [citel.sender],
            }, {
                quoted: citel,
            });

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "retrive",
            desc: "Copies and Forwords viewonce message.",
            category: "group",
            filename: __filename,
            use: '<reply to a viewonce message.>',
        },
        async(Void, citel, text) => {
            if (!citel.quoted) return reply("Please reply to any message Image or Video!");
            let mime = citel.quoted.mtype
            if (/viewOnce/.test(mime)) {
                const mtype = Object.keys(quoted.message)[0];
                delete quoted.message[mtype].viewOnce;
                const msgs = proto.Message.fromObject({
                    ...quoted.message,
                  });
                const prep = generateWAMessageFromContent(citel.chat, msgs, { quoted: citel });
                await Void.relayMessage(citel.chat, prep.message, { messageId: prep.key.id });
            } else {
                await citel.reply("please, reply to viewOnceMessage");
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "rwarn",
            desc: "Deletes all previously given warns of quoted user.",
            category: "group",
            filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, citel, text,{isCreator}) => {
            if (!isCreator) return citel.reply(tlang().owner)
            if (!citel.quoted) return citel.reply('Quote a user master.')
            await warndb.deleteOne({ id: citel.quoted.sender.split('@')[0] + 'warn' });
            return citel.reply('User is now free as a bird.\n.')
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "poll",
            desc: "Makes poll in group.",
            category: "group",
            filename: __filename,
            use: `question;option1,option2,option3.....`,
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner)
            let [poll, opt] = text.split(";");
            if (text.split(";") < 2)
                return await citel.reply(
                    `${prefix}poll question;option1,option2,option3.....`
                );
            let options = [];
            for (let i of opt.split(',')) {
                options.push(i);
            }
            await Void.sendMessage(citel.chat, {
                poll: {
                    name: poll,
                    values: options
                }
            })
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "profile",
            desc: "Shows profile of user.",
            category: "group",
            filename: __filename,
        },
        async(Void, citel, text) => {
            var bio = await Void.fetchStatus(citel.sender);
            var bioo = bio.status;
            let meh = citel.sender;
            const userq = await Levels.fetch(citel.sender, "RandomXP");
            const lvpoints = userq.level;
            var role = "GOD✨";
            if (lvpoints <= 2) {
                var role = "🏳Citizen";
            } else if (lvpoints <= 4) {
                var role = "🌟Rookie knight";
            } else if (lvpoints <= 6) {
                var role = "🌟knight";
            } else if (lvpoints <= 8) {
                var role = "🧙‍🌟Captain Knight";
            } else if (lvpoints <= 10) {
                var role = "🌀Baby Wizard";
            } else if (lvpoints <= 12) {
                var role = "🌀Wizard";
            } else if (lvpoints <= 14) {
                var role = "🌀Wizard King";
            } else if (lvpoints <= 16) {
                var role = "❄Baby Mage";
            } else if (lvpoints <= 18) {
                var role = "❄Mage";
            } else if (lvpoints <= 20) {
                var role = "❄Master of Mage";
            } else if (lvpoints <= 22) {
                var role = "🌊Child of Nobel";
            } else if (lvpoints <= 24) {
                var role = "🌊Nobel";
            } else if (lvpoints <= 26) {
                var role = "🌊Master of Nobel";
            } else if (lvpoints <= 28) {
                var role = "☇Child of Speed";
            } else if (lvpoints <= 30) {
                var role = "☇Dominator Speed";
            } else if (lvpoints <= 32) {
                var role = "☇God of Speed";
            } else if (lvpoints <= 34) {
                var role = "🌬 Child of Light";
            } else if (lvpoints <= 36) {
                var role = "🌬 Light";
            } else if (lvpoints <= 38) {
                var role = "🌬 God of Light";
            } else if (lvpoints <= 40) {
                var role = " 🌙 Legend X";
            } else if (lvpoints <= 42) {
                var role = "🎇 Angel ";
            } else if (lvpoints <= 44) {
                var role = "🎇 Fallen Angel";
            } else if (lvpoints <= 46) {
                var role = "🎭 Nearly Devil ";
            } else if (lvpoints <= 55) {
                var role = "🔥 Immortal Devil X ";
            }
            let ttms = `${userq.xp}` / 8;
            const timenow = moment(moment())
                .format('HH:mm:ss')
            moment.tz.setDefault('Asia/Kolakata')
                .locale('id')
            try {
                pfp = await Void.profilePictureUrl(citel.sender, "image");
            } catch (e) {
                pfp = await botpic();
            }
            const profile = `
*Hii ${citel.pushName},*
*Here is your profile information*
*👤Username:* ${citel.pushName}
*⚡️Bio:* ${bioo}
*😇Role:* ${role}
*✨Level:* ${userq.level}
*📥 Total Messages* ${ttms}
*Powered by ${tlang().title}*
`;
            let buttonMessage = {
                image: {
                    url: pfp,
                },
                caption: profile,
                footer: tlang().footer,
                headerType: 4,
            };
            Void.sendMessage(citel.chat, buttonMessage, {
                quoted: citel,
            });

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "rank",
            desc: "Sends rank card of user.",
            category: "group",
            filename: __filename,
        },
        async(Void, citel, text) => {
            const userq = await Levels.fetch(citel.sender, "RandomXP");
            const lvpoints = userq.level;
            var role = "GOD✨";
            if (lvpoints <= 2) {
                var role = "🏳Citizen";
            } else if (lvpoints <= 4) {
                var role = "🥷 Rookie Knight";
            } else if (lvpoints <= 6) {
                var role = "🥷 Knight";
            } else if (lvpoints <= 8) {
                var role = "🤺Captain Knight";
            } else if (lvpoints <= 10) {
                var role = "🌀 Baby Wizard";
            } else if (lvpoints <= 12) {
                var role = "🌀  Wizard";
            } else if (lvpoints <= 14) {
                var role = "🌀 Wizard King";
            } else if (lvpoints <= 16) {
                var role = "💧Baby Mage";
            } else if (lvpoints <= 18) {
                var role = "💧 Mage";
            } else if (lvpoints <= 20) {
                var role = "💧 Master of Mage";
            } else if (lvpoints <= 22) {
                var role = "❄ Child Of Nobel";
            } else if (lvpoints <= 24) {
                var role = "❄ Nobel";
            } else if (lvpoints <= 26) {
                var role = "❄ Master Of Nobel";
            } else if (lvpoints <= 28) {
                var role = "☇ Baby Speed";
            } else if (lvpoints <= 30) {
                var role = "☇ Dominator Speed";
            } else if (lvpoints <= 32) {
                var role = "☇ God Of Speed";
            } else if (lvpoints <= 34) {
                var role = "😇 Child Of Light";
            } else if (lvpoints <= 36) {
                var role = "🌬 Light";
            } else if (lvpoints <= 38) {
                var role = "🌬 God Of Light";
            } else if (lvpoints <= 40) {
                var role = "🌙 Legend X";
            } else if (lvpoints <= 42) {
                var role = "🎇 Angel";
            } else if (lvpoints <= 44) {
                var role = "🎇 Fallen Angel";
            } else if (lvpoints <= 46) {
                var role = "🎭 Nearly Devil!";
            } else if (lvpoints <= 55) {
                var role = "🔥Immortal Devil X";
            }
            let disc = citel.sender.substring(3, 7);
            let textr = '';
            textr += `*Hii ${tlang().greet} ,🌟 ${citel.pushName}∆${disc}'s* Exp\n\n`;
            let ttms = `${userq.xp}` / 8;
            textr += `*🌟Role*: ${role}\n*🟢Exp*: ${userq.xp} / ${Levels.xpFor(
    userq.level + 1
  )}\n*🏡Level*: ${userq.level}\n*Total Messages:*- ${ttms}`;
            try {
                ppuser = await Void.profilePictureUrl(citel.sender, "image");
            } catch {
                ppuser = THUMB_IMAGE;
            }
                    Void.sendMessage(citel.chat, {
                        image: await getBuffer(ppuser),
                        caption: textr,
                    }, {
                        quoted: citel,
                    });
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "leaderboard",
            alias: ["deck"],
            desc: "To check leaderboard",
            category: "general",
            filename: __filename,
        },
        async(Void, citel) => {
            const fetchlb = await Levels.fetchLeaderboard("RandomXP", 5);
            let leadtext = `
*-------------------------------*
*----● LeaderBoard ● -----*
*-------------------------------*
\n\n`
            for (let i = 0; i < fetchlb.length; i++) {
                const lvpoints = fetchlb[i].level
                var role = "GOD✨";
                if (lvpoints <= 2) {
                    var role = "🏳Citizen";
                } else if (lvpoints <= 4) {
                    var role = "🌟 Rookie Knight";
                } else if (lvpoints <= 6) {
                    var role = "🌟 Knight";
                } else if (lvpoints <= 8) {
                    var role = "🌟 Captain Knight";
                } else if (lvpoints <= 10) {
                    var role = "🌀 Baby Wizard";
                } else if (lvpoints <= 12) {
                    var role = "🌀 Wizard";
                } else if (lvpoints <= 14) {
                    var role = "🌀 Wizard King";
                } else if (lvpoints <= 16) {
                    var role = "💧 Baby Mage";
                } else if (lvpoints <= 18) {
                    var role = "💧 Mage";
                } else if (lvpoints <= 20) {
                    var role = "💧 Master Of Mage";
                } else if (lvpoints <= 22) {
                    var role = "❄ Child Of Nobel";
                } else if (lvpoints <= 24) {
                    var role = "❄ Nobel";
                } else if (lvpoints <= 26) {
                    var role = "❄ Master Of Nobel";
                } else if (lvpoints <= 28) {
                    var role = "☇ Child Of Speed";
                } else if (lvpoints <= 30) {
                    var role = "☇ Dominator Speed";
                } else if (lvpoints <= 32) {
                    var role = "☇ God Of Speed";
                } else if (lvpoints <= 34) {
                    var role = "🌬 Baby Light";
                } else if (lvpoints <= 36) {
                    var role = "🌬 Light";
                } else if (lvpoints <= 38) {
                    var role = "🌬 God Of Light";
                } else if (lvpoints <= 40) {
                    var role = "🌙 Legend X";
                } else if (lvpoints <= 42) {
                    var role = "🎇 Angel";
                } else if (lvpoints <= 44) {
                    var role = "🎇 Fallen Angel";
                } else if (lvpoints <= 46) {
                    var role = "🎭 Nearly Devil";
                } else if (lvpoints <= 55) {
                    var role = "🔥Immortal Devil X";
                }
                let data = await sck1.findOne({ id: fetchlb[i].userID })
                let namew = fetchlb[i].userID
                let ttms = fetchlb[i].xp / 8
                leadtext += `*${i + 1}●Name*: ${data.name}\n*●Level*: ${fetchlb[i].level}\n*●Points*: ${fetchlb[i].xp}\n*●Role*: ${role}\n*●Total messages*: ${ttms}\n\n`;
            }
            return citel.reply(leadtext)
        }
    )
    //---------------------------------------------------------------------------
cmd({
    pattern: "promote",
    desc: "Provides admin role to replied/quoted user",
    category: "group",
    filename: __filename,
    use: '<quote|reply|number>',
},
async(Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply("```Only My Owner Can Use This Command```");

    if (!citel.isGroup) return citel.reply(tlang().group);
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

    if (!isBotAdmins) return citel.reply("*_I'm Not Admin Here, So I Can't Promote Someone_*");
    if (!isAdmins) return citel.reply(tlang().admin);

    try {
        let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (!users) return;
        await Void.groupParticipantsUpdate(citel.chat, [users], "promote");
        return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key } });
    } catch {
        return await Void.sendMessage(citel.chat, { react: { text: '❌', key: citel.key } });
    }
});

cmd({
    pattern: "kick",
    desc: "Kicks replied/quoted user from the group.",
    category: "group",
    filename: __filename,
    use: '<quote|reply|number>',
},
async (Void, citel, text) => {
    if (!citel.isGroup) return citel.reply(tlang().group);
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

    if (!isAdmins) return citel.reply(tlang().admin);
    if (!isBotAdmins) return citel.reply(tlang().botAdmin);
    try {
        let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (!users) return;
        await Void.groupParticipantsUpdate(citel.chat, [users], "remove");
    } catch {
        // Handle any potential errors here.
    }
});


cmd({
    pattern: "memegen",
    desc: "Write text on a quoted image.",
    category: "group",
    filename: __filename,
    use: '<text>',
},
async (Void, citel, text) => {
    let mime = citel.quoted.mtype;
    if (!/image/.test(mime)) return citel.reply(`Reply to a photo with caption *text*`);
    mee = await Void.downloadAndSaveMediaMessage(citel.quoted);
    mem = await TelegraPh(mee);
    meme = await getBuffer(`https://api.memegen.link/images/custom/-/${text}.png?background=${mem}`);
    let buttonMessage = {
        image: meme,
        caption: "Here we go",
        footer: tlang().footer,
        headerType: 4,
    };
    Void.sendMessage(citel.chat, buttonMessage, {
        quoted: citel,
    });
    await fs.unlinkSync(mee);
});
cmd({
    pattern: /^group\s+(open|close)$/i, // Use regex to match open or close commands with any prefix
    desc: "Mute and unmute the group.",
    category: "group",
    filename: __filename,
},
async (Void, citel, match) => {
    const inputPrefix = match[0].toLowerCase(); // Extract the matched prefix command

    if (!citel.isGroup) return citel.reply(tlang().group);

    // Define and implement the getAdmin function to check user permissions.
    const isAdmin = await getAdmin(Void, citel);

    // Check if the user invoking the command is an admin.
    if (!isAdmin) return citel.reply(tlang().admin);

    if (inputPrefix === "group close") {
        // Mute the group chat by updating the group settings to "announcement."
        await Void.groupSettingUpdate(citel.chat, "announcement")
            .then((res) => citel.reply(`Group Chat Muted.`))
            .catch((err) => console.log(err));
    } else if (inputPrefix === "group open") {
        // Unmute the group chat by updating the group settings to "not_announcement."
        await Void.groupSettingUpdate(citel.chat, "not_announcement")
            .then((res) => citel.reply(`Group Chat Unmuted.`))
            .catch((err) => console.log(err));
    } else {
        return citel.reply(`Invalid command. Usage: group open - to open, group close - to close`);
    }
});


    //---------------------------------------------------------------------------
cmd({
            pattern: "grouppic",
            desc: "Sets a profile pic in Group..",
            category: "group",
            filename: __filename,
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;


            let mime = citel.quoted.mtype
            if (!citel.isGroup) citel.reply(tlang().group);
            if (!isAdmins) citel.reply(tlang().admin);
            if (!isBotAdmins) citel.reply(tlang().botadmin);
            if (!citel.quoted) return citel.reply(`Send/Reply Image With Caption ${command}`);
            if (!/image/.test(mime)) return citel.reply(`Send/Reply Image With Caption ${command}`);
            if (/webp/.test(mime)) return citel.reply(`Send/Reply Image With Caption ${command}`);
            let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
            await Void.updateProfilePicture(citel.chat, {
                    url: media,
                })
                .catch((err) => fs.unlinkSync(media));
            citel.reply(tlang().success);

        }
    )
    //---------------------------------------------------------------------------
cmd({
    pattern: "hidetag",
    alias: ["htag"],
    desc: "Tags every person of the group without mentioning their numbers",
    category: "group",
    filename: __filename,
    use: '<text>',
},
async (Void, citel, text) => {
    if (!citel.isGroup) return citel.reply(tlang().group);
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins) return citel.reply(tlang().admin);

    Void.sendMessage(citel.chat, {
        text: text ? text : "",
        mentions: participants.map((a) => a.id),
    }, {
        quoted: citel,
    });
});

cmd({
    pattern: "add",
    desc: "Adds a user to the group",
    category: "group",
    filename: __filename,
    use: '<number>',
},
async (Void, citel, text) => {
    if (!citel.isGroup) return citel.reply(tlang().group);

    // Check if the user is trying to add too quickly (anti-spam)
    if (antiSpam.has(citel.sender)) {
        return citel.reply("Please wait a bit before using this command again.");
    }

    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

    if (!isAdmins) return citel.reply(tlang().admin);
    if (!isBotAdmins) return citel.reply(tlang().botAdmin);

    try {
        let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (!users) return;

        await Void.groupParticipantsUpdate(citel.chat, [users], "add");
        
        // Mark the user as having used the command (anti-spam)
        antiSpam.add(citel.sender);
        
        // Set a timeout to remove the user from the anti-spam Set after a delay (e.g., 60 seconds)
        setTimeout(() => {
            antiSpam.delete(citel.sender);
        }, 60000); // 60 seconds

        return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key }});
    } catch {
        // Handle errors here
    }
});

cmd({
    pattern: "getjids",
    desc: "Sends chat id of every group.",
    category: "group",
    filename: __filename,
},
async (Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply(tlang().owner);
    let getGroups = await Void.groupFetchAllParticipating();
    let groups = Object.entries(getGroups)
        .slice(0)
        .map((entry) => entry[1]);
    let anu = groups.map((v) => v.id);
    let jackhuh = `All groups jid\n\n`;
    citel.reply(`Fetching jid from ${anu.length} Groups`);
    for (let i of anu) {
        let metadata = await Void.groupMetadata(i);
        await sleep(500);
        jackhuh += `*Subject:-* ${metadata.subject}\n`;
        jackhuh += `*Member :* ${metadata.participants.length}\n`;
        jackhuh += `*Jid:-* ${i}\n\n`;
    }
    citel.reply(jackhuh);
});

cmd({
    pattern: "demote",
    desc: "Demotes the replied/quoted user from the group",
    category: "group",
    filename: __filename,
    use: '<quote|reply|number>',
},
async (Void, citel, text, { isCreator }) => {
    if (!isCreator) return citel.reply("```Only My Owner Can Use This Command```")
    if (!citel.isGroup) return citel.reply(tlang().group);
    const groupAdmins = await getAdmin(Void, citel)
    const botNumber = await Void.decodeJid(Void.user.id)
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) return await citel.reply(`*_I'm Not Admin In This Group, Idiot_*`); 
    if (!isAdmins) return citel.reply(tlang().admin);
    
    try {
        let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        if (!users) return;
       await Void.groupParticipantsUpdate(citel.chat, [users], "demote");
       return await Void.sendMessage(citel.chat, { react: { text: '✨', key: citel.key }});
    } catch(e) { return await Void.sendMessage(users , {text :"Error While Demote User : " + e, } ,{quoted : citel})   }
});

cmd({
    pattern: "del",
    alias: ["delete"],
    desc: "Deletes the message of any user",
    category: "group",
    filename: __filename,
    use: '<quote/reply message.>',
},
async (Void, citel, text) => {
    if (citel.quoted.Bot) {
        const key = {
            remoteJid: citel.chat,
            fromMe: false,
            id: citel.quoted.id,
            participant: citel.quoted.sender
        }
        await Void.sendMessage(citel.chat, { delete: key })
    }
    if (!citel.quoted.isBot) {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupAdmins = await getAdmin(Void, citel)
        const botNumber = await Void.decodeJid(Void.user.id)
        const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins) return citel.reply('Only Admins are allowed to delete other persons message.')
        if (!isBotAdmins) return citel.reply('I can\'t delete anyone\'s message without getting Admin Role.')
        if (!citel.quoted) return citel.reply(`Please reply to any message.${tlang().greet}`);
                let { chat, fromMe, id } = citel.quoted;
                const key = {
                    remoteJid: citel.chat,
                    fromMe: false,
                    id: citel.quoted.id,
                    participant: citel.quoted.sender
                }
                await Void.sendMessage(citel.chat, { delete: key })
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "checkwarn",
            desc: "Check warns",
            category: "group",
            filename: __filename,
            use: '<quoted/reply user.>',
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply('This command is only for Group.')
            if (!citel.quoted) return citel.reply('Quote a user master.')
            teskd = `*All Warnings.*\n\n`
            let h = await warndb.find({ id: citel.quoted.sender.split('@')[0] + 'warn' })
            console.log(h)
            teskd += `*There are total ${h.length}  warnings.*\n`
            for (let i = 0; i < h.length; i++) {
                teskd += `*${i+1}*\n╭─────────────◆\n│ *🍁In Group:-* ${h[i].group}\n`
                teskd += `│ *⏱Time:-* ${h[i].date}\n`
                teskd += `│ *⚠️Warned by:-* ${h[i].warnedby}\n`
                teskd += `│ _🥷Reason: ${h[i].reason}_\n╰─────────────◆\n\n`
            }
            citel.reply(teskd)
        }

    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "block",
            desc: "blocks that person",
            fromMe: true,
            category: "owner",
            filename: __filename,
            use: '<quote/reply user.>',
        },
        async(Void, citel, text) => {
            if (!citel.quoted) return citel.reply("Please reply to user");
            if (!isCreator) citel.reply(tlang().owner);
            let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            await Void.updateBlockStatus(users, "block")
                .then((res) => console.log(jsonformat(res)))
                .catch((err) => console.log(jsonformat(err)));

        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "broadcast",
        alias: ["bc"],
        desc: "Bot makes a broadcast in all groups",
        fromMe: true,
        category: "group",
        filename: __filename,
        use: '<text for broadcast.>',
    },
    async(Void, citel, text) => {
        if (!isCreator) return citel.reply(tlang().owner)
        let getGroups = await Void.groupFetchAllParticipating();
        let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
        let anu = groups.map((v) => v.id);
        citel.reply(`Send Broadcast To ${anu.length} Group Chat, Finish Time ${
          anu.length * 1.5
        } second`);
        for (let i of anu) {
            await sleep(1500);
            let txt = `*--❗${tlang().title} Broadcast❗--*\n\n *🍀Author:* ${citel.pushName}\n\n${text}`;
            let buttonMessaged = {
                image: log0,
                caption: txt,
                footer: citel.pushName,
                headerType: 1,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: false,
                    externalAdReply: {
                        title: 'Broadcast by ' + citel.pushName,
                        body: tlang().title,
                        thumbnail: log0,
                        mediaUrl: '',
                        mediaType: 2,
                        sourceUrl: gurl,
                        showAdAttribution: true,
                    },
                },
            };
            await Void.sendMessage(i, buttonMessaged, {
                quoted: citel,
            });
        }
        citel.reply(`*Successful Sending Broadcast To ${anu.length} Group(s)*`);
    }
)

//---------------------------------------------------------------------------
if(Config.WORKTYPE!=='private'){
cmd({ on: "text" }, async(Void, citel) => {
    const randomXp = 8;
    let usrname = citel.pushName
    const hasLeveledUp = await Levels.appendXp(citel.sender, "RandomXP", randomXp);
    if (hasLeveledUp) {
        const sck1 = await Levels.fetch(citel.sender, "RandomXP");
        const lvpoints = sck1.level;
        var role = "GOD";
        if (lvpoints <= 2) {
            var role = "🏳Citizen";
        } else if (lvpoints <= 4) {
            var role = "🌟 Rookie Knight";
        } else if (lvpoints <= 6) {
            var role = "🌟 Knight";
        } else if (lvpoints <= 8) {
            var role = "🌟 Captain Knight";
        } else if (lvpoints <= 10) {
            var role = "🌀 Baby Wizard";
        } else if (lvpoints <= 12) {
            var role = "🌀 Wizard";
        } else if (lvpoints <= 14) {
            var role = "🌀 Wizard King";
        } else if (lvpoints <= 16) {
            var role = "💧 Baby Mage";
        } else if (lvpoints <= 18) {
            var role = "💧 Mage";
        } else if (lvpoints <= 20) {
            var role = "💧 Master Of Mage";
        } else if (lvpoints <= 22) {
            var role = "❄ Child Of Nobel";
        } else if (lvpoints <= 24) {
            var role = "❄ Nobel";
        } else if (lvpoints <= 26) {
            var role = "❄ Master Of Nobel";
        } else if (lvpoints <= 28) {
            var role = "☇ Child of Speed";
        } else if (lvpoints <= 30) {
            var role = "☇ Dominator Speed";
        } else if (lvpoints <= 32) {
            var role = "☇ God of Speed ";
        } else if (lvpoints <= 34) {
            var role = "🌬 Child Of Light";
        } else if (lvpoints <= 36) {
            var role = "🌬 Light";
        } else if (lvpoints <= 38) {
            var role = "🌬 Master Of Light";
        } else if (lvpoints <= 40) {
            var role = "🌙 Legend X";
        } else if (lvpoints <= 42) {
            var role = "🎇 Angel";
        } else if (lvpoints <= 44) {
            var role = "🎇 Fallen Angel X";
        } else if (lvpoints <= 46) {
            var role = "🎭 Nearly Devil";
        } else if (lvpoints <= 55) {
            var role = "🔥Immortal Devil X";
        } else {
            var role = "Kiddo";
        }
        if (Config.levelupmessage !== 'false') {
            await Void.sendMessage(citel.chat, {
                image: {
                    url: await botpic(),
                },
                caption: `┌─⋆⋅⋅⋆─ "Wow, Someone just" ─⋆⋅⋅⋆─┐
│ *leveled Up huh🔥*                   │
│ *👤Name*: ${citel.pushName}       │
│ *⚡Level*: ${sck1.level}🌀          │
│ *💫Exp*: ${sck1.xp} / ${Levels.xpFor(sck1.level + 1)} │
│ *📍Role*: *${role}*                   │
│ *Enjoy🥳*                              │
└─⋆⋅⋅⋆⋅⋅⋆⋅⋅⋆⋅⋅⋆⋅⋅⋆─┘

`,
            }, {
                quoted: citel,
            });
        }
    }

})
}
