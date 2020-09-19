const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb+srv://chiedev:chi3d3v@cluster-omusiclab.acy0y.gcp.mongodb.net/graphql-freecodecamp?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('connected to omusiclab database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
