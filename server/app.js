const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

const cors = require('cors')
app.use(cors())

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect("mongodb://bhushan:test123@gql-bhushan-shard-00-00.usz75.mongodb.net:27017,gql-bhushan-shard-00-01.usz75.mongodb.net:27017,gql-bhushan-shard-00-02.usz75.mongodb.net:27017/bhushan?ssl=true&replicaSet=atlas-uui4vk-shard-0&authSource=admin&retryWrites=true&w=majority")
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});


// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
