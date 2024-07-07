import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "**/schema.graphql",
  generates: {
    "src/generated/server/schema.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        mappers: {
          User: "@/db/types#UserEntity",
          Weather: "@/db/types#WeatherEntity",
        },
        skipTypename: true,
      },
    },
  },
};

export default config;
