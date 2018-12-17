const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use('/api', graphqlHTTP({
    //schema,
    graphiql: true,
}));

app.listen(4000, () => console.log('server is running...'));