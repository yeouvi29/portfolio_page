import { ApolloWrapper } from "@/app/ApolloWrapper";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <ApolloWrapper>{children}</ApolloWrapper>;
};
export default Layout;
