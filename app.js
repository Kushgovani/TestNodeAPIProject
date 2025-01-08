const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'});

const app =  require('./main');

mongoose.connect(
    process.env.DATABASE,
    //{ useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('Mongoo Connected!'))
.catch(
    err => console.error('Error connecting to MongoDB:', err)
);


const Port = process.env.PORT || 9000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})










