import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "**/schema.graphql",
  documents: "src/lib/graphql/apolloClient/queries.ts",
  generates: {
    "src/generated/client/": {
      preset: "client",
      plugins: ["typescript", "typescript-operations"],
      config: {
        skipTypename: true,
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
