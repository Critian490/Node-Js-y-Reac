const mongoose = require('mongoose');

const getConnection = async () => {
    try{
        const url ='mongodb+srv://rootiud:WCqsw4nTDogUUb2L@cluster0.hcawk.mongodb.net/Api_iud_db?retryWrites=true&w=majority';
        await mongoose.connect(url);

        console.log('Successful Connection to the Database');
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    getConnection,
}