const mongoose = require('mongoose')

const connectToDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log(`connected to database successfully`)
    }catch(e){
        console.error(`error connecting to database`, e);
        process.exit(1);
    }
}

module.exports = connectToDb;