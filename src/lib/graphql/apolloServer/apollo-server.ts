import fs from "fs";
import path from "path";

import gql from "graphql-tag";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { NextRequest } from "next/server";

import { resolvers } from "./resolvers";

const loadSchemaFiles = (folderPath: string) => {
  const files: string[] = [];
  const readFiles = (dir: string) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        readFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".graphql")) {
        files.push(fs.readFileSync(fullPath, { encoding: "utf8" }));
      }
    });
  };
  readFiles(folderPath);
  return files;
};

const typeDefs = mergeTypeDefs(
  loadSchemaFiles(path.join(process.cwd(), "/src/lib/graphql/schema")).map(
    (schema) =>
      gql`
        ${schema}
      `
  )
);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export const handler =
  startServerAndCreateNextHandler<NextRequest>(apolloServer);
