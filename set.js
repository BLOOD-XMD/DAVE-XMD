const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUMwd1J4ZHJDc0lsOVg4VEVhQm1vNG8wMEFyWUxqZVNUZWxncGU3OU9uST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTRUbS8xMkY1UmRkUXBSL2REbEl5WFRyYVVIakl5YXFSRmlic2wvTGFHMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRFhyVVFrWDJwNGlBL2JRSGowYXpSeGlWd0xOVjZBWlpkZm5oTzk1RmxjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLL1AyNHdHaE8wT0hVcEk0VTIyQzdKMlZWQ0ZZWk5vSEdxYUR5NmFJTmpZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNLcXNEaUFYWEp2QjdyNVYwK01oTTZRZlFkTzVmVW9CdUVzMVRXUVVzVnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1nM0xjVnMwWHpTelByaXBJdVJLbUxrUVVsaC9hbURzNU5CZ1lMRS85a1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU10bUtJUWJMR1QzN1pNMUZBQ3VWRmtHM253SWFheU9xMkNZcmpxb1kzMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL05KT0czOWZZNzh3MnE5S2FnLzBUTmdIZXdiRW53b2M4U1RmdVRDMU1XYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijc1UFZpRUZiMy8zZzZlRjFUb1lUUXU2Q2xQZFh3OHNmUzNSNnJRWFdoVXZtdkpWb0FWRSttNTJSL2NUWjNHblZwdEcwOGtFKzN5alV5dHNuaDZrYmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIsImFkdlNlY3JldEtleSI6ImxHcmR3ME0xVVJPdHF2dldwUW56a1lsbmhLbVZEZG9sdFNJMFdOVXRXMDQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MDE4MTM4MzRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMUJBNzFBMTY5RDdEMTcxM0Y3OTc1NERGRUI0MkQ2QzkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDEwNTc1M30seyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MDE4MTM4MzRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODFDNTlERUMwMTQyQ0UyMTk3NTE0RjdFQzdFRDEyMDAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDEwNTc1Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiM1owWXUzQTlRX2FPcDROem95TWstQSIsInBob25lSWQiOiIyMmM0MDIyOS0zZjQ1LTQxY2EtOWRkNC01YTJjODc0NDE1MzgiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicDI5Q2R5ZHllMlVCNTYyQ0c2bVluRm5YYTlZPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRROUtvY2VvWkNnV29vVzhwcW9FazFobWRUVT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJBQkNEMTIzNCIsIm1lIjp7ImlkIjoiOTQ3MDE4MTM4MzQ6MzVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2SrvCdkrbwnZK48J2SvfCdkr7wnZOO8J2SvfCdk4fwnZK2IPCdk4LwnZK28J2SufCdk4rwnZOI8J2StvCdk4PwnZOA8J2StiDwnZOH8J2StvCdk4nwnZK98J2Tg/CdkrbwnZOO8J2StvCdk4DwnZGSIC4uLi4uLi4uLiEhIiwibGlkIjoiOTI2NDg5ODgwNTgxMDozNUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ011VjUrb0hFTytPdHNRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImYwbFJKOUE2YkxranlkZ0l0SklSeUJiK3B6UGZRdFlLdkpiNWZHK2lUUUU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjdOOVVyZ1FYbFExRFZqQU04NFRsUmkxY0FmMFZBTGFONk0veURidFY2UEJMTXVHaDc3K3J2aE4wMGlMWnVNekZTZm1zbXVHbm9FZisrY3pYanpMZkR3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJOenVGeWQ5eDU3dDM4Uzkzb1Z0QlczMkluZS8rUUNZZ0htUkREeEZaUHVxTTYrVXFrbDNBUlBPQk5ISklvaEdpQlloNlFIaFd4ZjlVeHRLenVURzlqdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzAxODEzODM0OjM1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlg5SlVTZlFPbXk1SThuWUNMU1NFY2dXL3FjejMwTFdDcnlXK1h4dm9rMEIifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1NDEwNTcyNCwibGFzdFByb3BIYXNoIjoiMlY3N3FVIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLMDMifQ==',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/giftdee/DAVE-XMD',
    OWNER_NAME : process.env.OWNER_NAME || "gifteddave",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254111687009",  

    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    AUTO_REACT: process.env.AUTO_REACTION || "no",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/sigghy.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'no',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By DAVE-XMD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'no',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || 'yes',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VbApvFQ2Jl84lhONkc3k",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VbApvFQ2Jl84lhONkc3k",
    CAPTION : process.env.CAPTION || "DAVE-XMD",
    BOT : process.env.BOT_NAME || 'DAVE-XMD',
    MODE: process.env.PUBLIC_MODE || "yes",              
    TIMEZONE: process.env.TIMEZONE || "Africa/NAIROBI", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || '',
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || '',
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    FREDI_DELETE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'no', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
