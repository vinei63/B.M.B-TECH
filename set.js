const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0NNdDNoNDV3VGJTWTVCR0VvNEtoK0JCMmxRNGRmM1Uybi9PNmFlM2QyVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVcyMzBSaE1VTDArU1JkYmJFTXdtV1o3d25td05Sa0haSlNBV2NPZkYwTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSWRDSjZkM1kwWUk5b2ptanVpd1dKWDd2V0crK3FRMXZraWxPRHBnTEgwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrekwzUXI1UnM2N1J1RnBiR1U5bWp0YW44WmRDK1ZCazdjUUNhcU56ekY4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFOZlpRMUFzL2QrUkxacUYvY0VuN0hVZlJKNVp1SjY4MG5mVE9UR2hSVzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFLaXF4VkN5SGtnRUYzbmpoU0JhTGZJVkRDcGhpR2E5MU5SSjUxRjFtaUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUR0VzR3cTRza2FTc3EwSStyZXlJV3RqaTFYallEZHEvSENEM2djSGxtOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUdLR2tzYzcrSlpWYkJzS2lZR2hNWi9TRGNCSjZ4VzMybHh1dU1qTGdnQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdHMTljdHJHWmp5ajZqQ0dZVnVxSTQ2ZEN6VDYrbENiNGZJcnRFZ21ERmZsQ2YrRlhwMnBWRnZaQjhEa2dJZGYyQTkxYklUcnUyNWd3MmtGcjFZU0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgzLCJhZHZTZWNyZXRLZXkiOiJVVjBCb2toa3FzQTBjSGR4MzRGZXhwUHFHK3lrMGVPRUZhREc4Z3BHc2R3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJCMzdXUEhCWiIsIm1lIjp7ImlkIjoiMjU1NzgxOTk0NDIyOjFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyMzAyMzI0MjY1NjU3Nzk6MUBsaWQiLCJuYW1lIjoiTXIgQWJieSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT2JNbFRnUXRNdnl3UVlZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoielZiRUFhREM2MjMvZzdRdGVZNGtwSVVBUUd3QmR2S2d1YXlBZTlqbE5qZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiS3d1QWVpYlNENDRPYXZ4dEd4YmtFa2g3TEZmaGt5T2EvVDVhV0dqMzdIQW0vK290WTdPNmtjUWwxOG1abWxVdEt3WXB4cnFsK2JEcEVSLzlDR1BMQmc9PSIsImRldmljZVNpZ25hdHVyZSI6IjlRaGZSY2RhSXNDcmJsMXlQY2JVaFlmUVlQcXNjYnl4K1ZMNjkxLzd0Z0FseVBzZ29MRElFUTlEbmZpTjNERDJVVG5rN0ZPME9GODRQUUNCY2JVY0JnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NzgxOTk0NDIyOjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYzFXeEFHZ3d1dHQvNE8wTFhtT0pLU0ZBRUJzQVhieW9MbXNnSHZZNVRZNCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4ODA1MDU4LCJsYXN0UHJvcEhhc2giOiIyUDFZaGYifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Mr Abby",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255781994422",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

