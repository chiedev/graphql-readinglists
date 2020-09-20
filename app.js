const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// connect to mongodb
// make sure to replace my db string & creds with your own
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster-omusiclab.acy0y.gcp.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`).then(() => {
    app.listen(4000, () => {
        console.log('Connected to omusiclab database. Now listening for requests on port 4000');
        console.log(mongoose.version)
    });    
}).catch(err => { 
    console.log(err); 
});