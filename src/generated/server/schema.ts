import { GraphQLResolveInfo } from "graphql";
import { UserEntity, WeatherEntity } from "@/db/types";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Condition = {
  code: Scalars["Int"]["output"];
  icon: Scalars["String"]["output"];
  text: Scalars["String"]["output"];
};

export type Filter = {
  membershipStatus?: InputMaybe<Scalars["String"]["input"]>;
  paymentStatus?: InputMaybe<Scalars["String"]["input"]>;
  subscriptionPlan?: InputMaybe<Scalars["String"]["input"]>;
};

export type Pagination = {
  limit: Scalars["Int"]["input"];
  offset: Scalars["Int"]["input"];
};

export type Query = {
  user?: Maybe<User>;
  users?: Maybe<UserSubList>;
  weather?: Maybe<Array<Weather>>;
};

export type QueryUserArgs = {
  userName: Scalars["ID"]["input"];
};

export type QueryUsersArgs = {
  filter?: InputMaybe<Filter>;
  pagination: Pagination;
  search?: InputMaybe<Search>;
  sort: Sort;
};

export type Search = {
  item?: InputMaybe<Scalars["String"]["input"]>;
  value?: InputMaybe<Scalars["String"]["input"]>;
};

export type Sort = {
  item: Scalars["String"]["input"];
  order: Scalars["String"]["input"];
};

export type Temp = {
  avg: TempDetails;
  max: TempDetails;
  min: TempDetails;
};

export type TempDetails = {
  c: Scalars["String"]["output"];
  f: Scalars["String"]["output"];
};

export type User = {
  email: Scalars["String"]["output"];
  lastLogin: Scalars["String"]["output"];
  membershipStatus: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  paymentStatus: Scalars["String"]["output"];
  registeredDate: Scalars["String"]["output"];
  subscriptionPlan: Scalars["String"]["output"];
  userName: Scalars["ID"]["output"];
};

export type UserSubList = {
  totalUsers: Scalars["Int"]["output"];
  users: Array<User>;
};

export type Weather = {
  condition: Condition;
  date: Scalars["String"]["output"];
  temp: Temp;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Condition: ResolverTypeWrapper<Condition>;
  Filter: Filter;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Pagination: Pagination;
  Query: ResolverTypeWrapper<{}>;
  Search: Search;
  Sort: Sort;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Temp: ResolverTypeWrapper<Temp>;
  TempDetails: ResolverTypeWrapper<TempDetails>;
  User: ResolverTypeWrapper<UserEntity>;
  UserSubList: ResolverTypeWrapper<
    Omit<UserSubList, "users"> & { users: Array<ResolversTypes["User"]> }
  >;
  Weather: ResolverTypeWrapper<WeatherEntity>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]["output"];
  Condition: Condition;
  Filter: Filter;
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  Pagination: Pagination;
  Query: {};
  Search: Search;
  Sort: Sort;
  String: Scalars["String"]["output"];
  Temp: Temp;
  TempDetails: TempDetails;
  User: UserEntity;
  UserSubList: Omit<UserSubList, "users"> & {
    users: Array<ResolversParentTypes["User"]>;
  };
  Weather: WeatherEntity;
};

export type ConditionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Condition"] = ResolversParentTypes["Condition"]
> = {
  code?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "userName">
  >;
  users?: Resolver<
    Maybe<ResolversTypes["UserSubList"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, "pagination" | "sort">
  >;
  weather?: Resolver<
    Maybe<Array<ResolversTypes["Weather"]>>,
    ParentType,
    ContextType
  >;
};

export type TempResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Temp"] = ResolversParentTypes["Temp"]
> = {
  avg?: Resolver<ResolversTypes["TempDetails"], ParentType, ContextType>;
  max?: Resolver<ResolversTypes["TempDetails"], ParentType, ContextType>;
  min?: Resolver<ResolversTypes["TempDetails"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TempDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TempDetails"] = ResolversParentTypes["TempDetails"]
> = {
  c?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  f?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lastLogin?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  membershipStatus?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  paymentStatus?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  registeredDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  subscriptionPlan?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  userName?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSubListResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserSubList"] = ResolversParentTypes["UserSubList"]
> = {
  totalUsers?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WeatherResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Weather"] = ResolversParentTypes["Weather"]
> = {
  condition?: Resolver<ResolversTypes["Condition"], ParentType, ContextType>;
  date?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  temp?: Resolver<ResolversTypes["Temp"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Condition?: ConditionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Temp?: TempResolvers<ContextType>;
  TempDetails?: TempDetailsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserSubList?: UserSubListResolvers<ContextType>;
  Weather?: WeatherResolvers<ContextType>;
};
