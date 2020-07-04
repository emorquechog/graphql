import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
import { Container } from "typedi";
const express = require("express");
// resolvers
import { PersonResolver } from "./resolvers/Categories";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [PersonResolver],
    container: Container,
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  // const mongoose = await connect("mongodb://localhost:27017/test", {
  //   useNewUrlParser: true,
  // });
  // await mongoose.connection;

  const server = new ApolloServer({ schema });
  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port: 3333 }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`
    )
  );
}
bootstrap().catch((error) => {
  console.log(error, "error");
});
