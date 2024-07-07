import { handler } from "@/lib/graphql/apolloServer/apollo-server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
