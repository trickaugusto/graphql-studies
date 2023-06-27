require("dotenv").config();

import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import "./database";
import "./database/schemas/Tweet";

import schemaFn from "./schemas";

const app = async () => {
  const schema = await schemaFn();

  const server = new ApolloServer({ schema });

  server.listen({ port: 4000 }, () =>
    console.log("Server is running on port 4000")
  );
};

app();
