import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/lib/schema.graphql",
  documents: "src/**/*.ts",
  generates: {
    "src/generated/": {
      preset: "client",
      plugins: [],
      config: {
        mappers: {
          User: "../db/types#UserEntity",
        },
        skipTypename: true,
      },
    },
  },
};

export default config;
