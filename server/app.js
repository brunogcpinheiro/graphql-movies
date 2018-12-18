const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/schema');

const app = express();

app.use("/api", graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(process.env.PORT, () => console.log("server is running..."));