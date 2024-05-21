//require("dotenv").config();
// const config =  {
//     DATABASE: (process.env.NODE_ENV=='PRODUCTION') ? process.env.MONDOGB_DATABASE_PRODUCTION : process.env.MONDOGB_DATABASE ,
//     USERNAME: (process.env.NODE_ENV=='PRODUCTION') ? process.env.MONDOGB_USERNAME_PRODUCTION : process.env.MONDOGB_USERNAME,
//     PASSWORD: (process.env.NODE_ENV=='PRODUCTION') ? process.env.MONDOGB_PASSWORD_PRODUCTION : process.env.MONDOGB_PASSWORD
// }
// module.exports = {config};

const environment={
    dev:{
        DATABASE:process.env.MONDOGB_DATABASE,
        USERNAME:process.env.MONDOGB_USERNAME,
        PASSWORD:process.env.MONDOGB_PASSWORD
    },
    production:{
        DATABASE:process.env.MONDOGB_DATABASE_PRODUCTION,
        USERNAME:process.env.MONDOGB_USERNAME_PRODUCTION,
        PASSWORD:process.env.MONDOGB_PASSWORD_PRODUCTION
    }
}

module.exports = environment[process.env.NODE_ENV];