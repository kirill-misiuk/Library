import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Book = {
   __typename?: 'Book',
  _id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  author?: Maybe<Scalars['String']>,
  pageCount?: Maybe<Scalars['Int']>,
  year?: Maybe<Scalars['Int']>,
  title?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Float']>,
};

export type CreateBookInput = {
  name: Scalars['String'],
  libraryIds?: Maybe<Array<Maybe<Scalars['ID']>>>,
  author: Scalars['String'],
  pageCount: Scalars['Int'],
  year: Scalars['Int'],
  title: Scalars['String'],
  price: Scalars['Float'],
};

export type CreateLibraryInput = {
  name: Scalars['String'],
  archive?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type Deleted = {
   __typename?: 'Deleted',
  _id?: Maybe<Scalars['ID']>,
};

export type FindInput = {
  search?: Maybe<Scalars['String']>,
  count?: Maybe<Scalars['Int']>,
  size?: Maybe<Scalars['Int']>,
};

export type Library = {
   __typename?: 'Library',
  _id: Scalars['ID'],
  name: Scalars['String'],
  archive?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createLibrary?: Maybe<Library>,
  updateLibrary?: Maybe<Library>,
  deleteLibrary?: Maybe<Array<Maybe<Deleted>>>,
  createBook?: Maybe<Book>,
  updateBook?: Maybe<Book>,
  deleteBook?: Maybe<Array<Maybe<Deleted>>>,
};


export type MutationCreateLibraryArgs = {
  library?: Maybe<CreateLibraryInput>
};


export type MutationUpdateLibraryArgs = {
  library?: Maybe<UpdateLibraryInput>
};


export type MutationDeleteLibraryArgs = {
  _id?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type MutationCreateBookArgs = {
  book?: Maybe<CreateBookInput>
};


export type MutationUpdateBookArgs = {
  book?: Maybe<UpdateBookInput>
};


export type MutationDeleteBookArgs = {
  _id?: Maybe<Array<Maybe<Scalars['ID']>>>
};

export type Query = {
   __typename?: 'Query',
  libraries?: Maybe<Array<Maybe<Library>>>,
  library?: Maybe<Library>,
  getLibraries?: Maybe<Array<Maybe<Library>>>,
  books?: Maybe<Array<Maybe<Book>>>,
  book?: Maybe<Book>,
  getLibraryBooks?: Maybe<Array<Maybe<Book>>>,
};


export type QueryLibrariesArgs = {
  params?: Maybe<FindInput>
};


export type QueryLibraryArgs = {
  _id?: Maybe<Scalars['ID']>
};


export type QueryGetLibrariesArgs = {
  _id?: Maybe<Scalars['ID']>
};


export type QueryBooksArgs = {
  params?: Maybe<FindInput>
};


export type QueryBookArgs = {
  _id?: Maybe<Scalars['ID']>
};


export type QueryGetLibraryBooksArgs = {
  _id?: Maybe<Scalars['ID']>
};

export type UpdateBookInput = {
  _id: Scalars['ID'],
  libraryID?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  author?: Maybe<Scalars['String']>,
  pageCount?: Maybe<Scalars['Int']>,
  year?: Maybe<Scalars['Int']>,
  title?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Float']>,
};

export type UpdateLibraryInput = {
  _id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  archive?: Maybe<Array<Maybe<Scalars['String']>>>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  FindInput: FindInput,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Library: ResolverTypeWrapper<Library>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Book: ResolverTypeWrapper<Book>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateLibraryInput: CreateLibraryInput,
  UpdateLibraryInput: UpdateLibraryInput,
  Deleted: ResolverTypeWrapper<Deleted>,
  CreateBookInput: CreateBookInput,
  UpdateBookInput: UpdateBookInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  FindInput: FindInput,
  String: Scalars['String'],
  Int: Scalars['Int'],
  Library: Library,
  ID: Scalars['ID'],
  Book: Book,
  Float: Scalars['Float'],
  Mutation: {},
  CreateLibraryInput: CreateLibraryInput,
  UpdateLibraryInput: UpdateLibraryInput,
  Deleted: Deleted,
  CreateBookInput: CreateBookInput,
  UpdateBookInput: UpdateBookInput,
  Boolean: Scalars['Boolean'],
};

export type BookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  pageCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type DeletedResolvers<ContextType = any, ParentType extends ResolversParentTypes['Deleted'] = ResolversParentTypes['Deleted']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type LibraryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Library'] = ResolversParentTypes['Library']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  archive?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createLibrary?: Resolver<Maybe<ResolversTypes['Library']>, ParentType, ContextType, MutationCreateLibraryArgs>,
  updateLibrary?: Resolver<Maybe<ResolversTypes['Library']>, ParentType, ContextType, MutationUpdateLibraryArgs>,
  deleteLibrary?: Resolver<Maybe<Array<Maybe<ResolversTypes['Deleted']>>>, ParentType, ContextType, MutationDeleteLibraryArgs>,
  createBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, MutationCreateBookArgs>,
  updateBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, MutationUpdateBookArgs>,
  deleteBook?: Resolver<Maybe<Array<Maybe<ResolversTypes['Deleted']>>>, ParentType, ContextType, MutationDeleteBookArgs>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  libraries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Library']>>>, ParentType, ContextType, QueryLibrariesArgs>,
  library?: Resolver<Maybe<ResolversTypes['Library']>, ParentType, ContextType, QueryLibraryArgs>,
  getLibraries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Library']>>>, ParentType, ContextType, QueryGetLibrariesArgs>,
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType, QueryBooksArgs>,
  book?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, QueryBookArgs>,
  getLibraryBooks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType, QueryGetLibraryBooksArgs>,
};

export type Resolvers<ContextType = any> = {
  Book?: BookResolvers<ContextType>,
  Deleted?: DeletedResolvers<ContextType>,
  Library?: LibraryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
