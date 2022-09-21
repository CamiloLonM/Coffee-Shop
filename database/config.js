const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: false,
        })
        console.log('Database Connected!!!')
    } catch (error) {
        console.log(error);
        throw new Error('Error starting DB!!!')
    }
}


module.exports = {
    dbConnection
}