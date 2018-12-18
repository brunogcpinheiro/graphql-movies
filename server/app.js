const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

mongoose.connect("mongodb://admin:test123@ds239692.mlab.com:39692/graphql-movies");
mongoose.connection.once("open", () => console.log('connected to database!'));

app.use("/api", graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(process.env.PORT, () => console.log("server is running..."));