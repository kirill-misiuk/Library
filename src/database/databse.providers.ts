import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect('mongodb://127.0.0.1:27021/graphql', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            }),
    },
];
