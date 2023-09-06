import { ApolloServer } from '@apollo/server';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
// import { startStandaloneServer } from '@apollo/server/standalone';
import { useServer } from 'graphql-ws/lib/use/ws';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import typeDefs from './typeDefinitions/typeDefs.js';
import resolvers from './typeResolvers/resolvers.js';
import { executeAxiosGetRequest, executeAxiosPostRequest } from './databaseCommunication/databaseCommunication.js';
import 'dotenv/config';
const PORT = Number.parseInt(process.env.PORT) || 4000;
export const pubsub = new PubSub();
const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();
const httpServer = createServer(app);
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});
const serverCleanup = useServer({
    schema,
    context: (ctx, msg, args) => {
        ctx['pubsub'] = pubsub;
        return {
            ctx, msg, args
        };
    }
}, wsServer);
const server = new ApolloServer({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),
        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});
await server.start();
app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server, {
    context: async () => ({
        pubsub: pubsub,
        post: executeAxiosPostRequest,
        get: executeAxiosGetRequest,
        //me: //todo
    })
}));
httpServer.listen(PORT, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`);
});
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
// });
// const { url } = await startStandaloneServer(server, {
//     listen: { port: PORT },
// context: async () => ({
//     post: executeAxiosPostRequest,
//     get: executeAxiosGetRequest,
//     //me: //todo
// })
// });
//  console.log(`🚀  Server ready at: ${url}`);
