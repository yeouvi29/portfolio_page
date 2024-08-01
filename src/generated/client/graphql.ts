/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Condition = {
  code: Scalars['Int']['output'];
  icon: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type Filter = {
  membershipStatus?: InputMaybe<Scalars['String']['input']>;
  paymentStatus?: InputMaybe<Scalars['String']['input']>;
  subscriptionPlan?: InputMaybe<Scalars['String']['input']>;
};

export type Pagination = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type Query = {
  user?: Maybe<User>;
  users?: Maybe<UserSubList>;
  weather?: Maybe<Array<Weather>>;
};


export type QueryUserArgs = {
  userName: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<Filter>;
  pagination: Pagination;
  search?: InputMaybe<Search>;
  sort: Sort;
};

export type Search = {
  item?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Sort = {
  item: Scalars['String']['input'];
  order: Scalars['String']['input'];
};

export type Temp = {
  avg: TempDetails;
  max: TempDetails;
  min: TempDetails;
};

export type TempDetails = {
  c: Scalars['String']['output'];
  f: Scalars['String']['output'];
};

export type User = {
  email: Scalars['String']['output'];
  lastLogin: Scalars['String']['output'];
  membershipStatus: Scalars['String']['output'];
  name: Scalars['String']['output'];
  paymentStatus: Scalars['String']['output'];
  registeredDate: Scalars['String']['output'];
  subscriptionPlan: Scalars['String']['output'];
  userName: Scalars['ID']['output'];
};

export type UserSubList = {
  totalUsers: Scalars['Int']['output'];
  users: Array<User>;
};

export type Weather = {
  condition: Condition;
  date: Scalars['String']['output'];
  temp: Temp;
};

export type UserQueryVariables = Exact<{
  pagination: Pagination;
  sort: Sort;
  filter?: InputMaybe<Filter>;
  search?: InputMaybe<Search>;
}>;


export type UserQuery = { users?: { totalUsers: number, users: Array<{ userName: string, name: string, email: string, registeredDate: string, membershipStatus: string, lastLogin: string, subscriptionPlan: string, paymentStatus: string }> } | null };

export type WeatherQueryVariables = Exact<{ [key: string]: never; }>;


export type WeatherQuery = { weather?: Array<{ date: string, temp: { avg: { c: string, f: string }, max: { c: string, f: string }, min: { c: string, f: string } }, condition: { text: string, code: number, icon: string } }> | null };


export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Sort"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"registeredDate"}},{"kind":"Field","name":{"kind":"Name","value":"membershipStatus"}},{"kind":"Field","name":{"kind":"Name","value":"lastLogin"}},{"kind":"Field","name":{"kind":"Name","value":"subscriptionPlan"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalUsers"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const WeatherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Weather"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weather"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"temp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"c"}},{"kind":"Field","name":{"kind":"Name","value":"f"}}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"c"}},{"kind":"Field","name":{"kind":"Name","value":"f"}}]}},{"kind":"Field","name":{"kind":"Name","value":"min"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"c"}},{"kind":"Field","name":{"kind":"Name","value":"f"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"condition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]}}]} as unknown as DocumentNode<WeatherQuery, WeatherQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Condition = {
  code: Scalars['Int']['output'];
  icon: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type Filter = {
  membershipStatus?: InputMaybe<Scalars['String']['input']>;
  paymentStatus?: InputMaybe<Scalars['String']['input']>;
  subscriptionPlan?: InputMaybe<Scalars['String']['input']>;
};

export type Pagination = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type Query = {
  user?: Maybe<User>;
  users?: Maybe<UserSubList>;
  weather?: Maybe<Array<Weather>>;
};


export type QueryUserArgs = {
  userName: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<Filter>;
  pagination: Pagination;
  search?: InputMaybe<Search>;
  sort: Sort;
};

export type Search = {
  item?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Sort = {
  item: Scalars['String']['input'];
  order: Scalars['String']['input'];
};

export type Temp = {
  avg: TempDetails;
  max: TempDetails;
  min: TempDetails;
};

export type TempDetails = {
  c: Scalars['String']['output'];
  f: Scalars['String']['output'];
};

export type User = {
  email: Scalars['String']['output'];
  lastLogin: Scalars['String']['output'];
  membershipStatus: Scalars['String']['output'];
  name: Scalars['String']['output'];
  paymentStatus: Scalars['String']['output'];
  registeredDate: Scalars['String']['output'];
  subscriptionPlan: Scalars['String']['output'];
  userName: Scalars['ID']['output'];
};

export type UserSubList = {
  totalUsers: Scalars['Int']['output'];
  users: Array<User>;
};

export type Weather = {
  condition: Condition;
  date: Scalars['String']['output'];
  temp: Temp;
};

export type UserQueryVariables = Exact<{
  pagination: Pagination;
  sort: Sort;
  filter?: InputMaybe<Filter>;
  search?: InputMaybe<Search>;
}>;


export type UserQuery = { users?: { totalUsers: number, users: Array<{ userName: string, name: string, email: string, registeredDate: string, membershipStatus: string, lastLogin: string, subscriptionPlan: string, paymentStatus: string }> } | null };

export type WeatherQueryVariables = Exact<{ [key: string]: never; }>;


export type WeatherQuery = { weather?: Array<{ date: string, temp: { avg: { c: string, f: string }, max: { c: string, f: string }, min: { c: string, f: string } }, condition: { text: string, code: number, icon: string } }> | null };
