const os = require('os');
const moment = require('moment');
const fs = require('fs');
const Config = require('./config'); // Adjust the path if necessary
let { fancytext, tlang, tiny, runtime, formatp, botpic, prefix, sck1 } = require('./your-config-file'); // Adjust the path to your config file

function _0xb39e() {
  const _0x238318 = [
    // ... (your code here)
  ];
  _0xb39e = function (_0x1129bd, _0x445d9b) {
    _0x1129bd = _0x1129bd - 0x158;
    let _0x18eac4 = _0xb39e9e[_0x1129bd];
    return _0x18eac4;
  };
  return _0xb39e();
}

const long = String.fromCharCode(0x200e);
const readmore = long.repeat(0xfa1);
const Secktor = require('./secktor'); // Adjust the path to your Secktor module

Secktor.command({
  pattern: 'help',
  alias: ['commands'],
  desc: 'Help list',
  category: 'general',
  react: '✨',
  filename: __filename,
}, async (match, reply) => {
  const { commands } = require('./lib');
  if (match.split(' ')[0]) {
    let _0x29797f = [];
    const _0x1297b6 = commands.find(_0x4f444d => _0x4f444d.pattern === match.split(' ')[0].toLowerCase());
    if (!_0x1297b6) return await reply('❌ No Such commands.');
    else _0x29797f.push('📡 Usage: ' + prefix + _0x1297b6.pattern + ' ' + _0x1297b6.usage);
    return await reply(_0x29797f.join('\n'));
  } else {
    const _0x185d93 = {};
    commands.forEach(async (_0x1563c7, _0x1cde65) => {
      if (!_0x1563c7.dontAddCommandList && _0x1563c7.pattern !== undefined) {
        if (!_0x185d93[_0x1563c7.category]) _0x185d93[_0x1563c7.category] = [];
        _0x185d93[_0x1563c7.category].push(_0x1563c7.pattern);
      }
    });
    const _0x462728 = moment(moment()).tz('Asia/Kolkata').locale('id');
    const _0x5dd623 = moment.tz('Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss');
    let _0x16b1ac = await sck1.list(), _0x2ce686 = '🥷\n';
    _0x2ce686 += '```\n' + '💼 Type: ' + Config.ownername.split(' ')[0] + ' ' + Config.ownername.split(' ')[1] + '\n';
    _0x2ce686 += '📡 Usage:\n';
    _0x2ce686 += '  ```' + '🥷 Owner: ' + Config.ownername + '\n';
    _0x2ce686 += '  🛠️ Commands: ' + commands.length + '\n';
    _0x2ce686 += '  🕐 Uptime: ' + runtime(process.uptime()) + '\n';
    _0x2ce686 += '  👾 Memory: ' + formatp(os.totalmem() - os.freemem()) + '/' + formatp(os.totalmem()) + '\n';
    _0x2ce686 += '```';
    for (const _0x32ef0c in _0x185d93) {
      _0x2ce686 += '\n' + '〘 ' + tiny(_0x32ef0c) + ' 〙─────';
      if (match.toLowerCase() == _0x32ef0c.toLowerCase()) {
        _0x2ce686 = '🍐' + tiny(_0x32ef0c) + '  🍐\n';
        for (const _0x3ce7be of _0x185d93[_0x32ef0c]) {
          _0x2ce686 += '│ ' + fancytext(_0x3ce7be, 1) + '\n';
        }
        _0x2ce686 += '🌟';
        break;
      } else {
        for (const _0x14efca of _0x185d93[_0x32ef0c]) {
          _0x2ce686 += '\n│ ' + fancytext(_0x14efca, 1) + '\n';
        }
        _0x2ce686 += '🌟';
      }
    }
    _0x2ce686 += '\n⋆⋅👾⋅⋆';
    let _0x41763e = {
      image: {
        url: await botpic(),
      },
      caption: _0x2ce686,
    };
    return await match.sendMessage(reply, _0x41763e);
  }
});

Secktor.command({
  pattern: 'info',
  desc: 'Get bot info',
  category: 'general',
}, async (match, reply) => {
  const { commands } = require('./lib');
  let _0x51fde2 = '👍 * ' + fancytext(Config.ownername.split(' ')[0], 0x3a) + ' 👍  〙─────';
  _0x51fde2 += '🧧 User: ' + match.pushName + '  |  ' + tlang()[match.language] + '\n';
  _0x51fde2 += '👾 Prefix: ' + prefix + '\n';
  _0x51fde2 += '┃⛥└─⋆ ' + 'Owner: ' + Config.ownername + '\n';
  _0x51fde2 += '┃⛥   Mem: ' + os.freemem() + '/' + os.totalmem() + '\n';
  _0x51fde2 += '📡 Commands: ' + commands.length + '\n';
  _0x51fde2 += '🕐 Uptime: ' + runtime(process.uptime()) + '\n';
  _0x51fde2 += '👾 Bots: ' + formatp(os.totalmem() - os.freemem()) + '\n';
  for (let _0x32fc98 = 0; _0x32fc98 < commands.length; _0x32fc98++) {
    if (commands[_0x32fc98].pattern === undefined) continue;
    _0x51fde2 += '
