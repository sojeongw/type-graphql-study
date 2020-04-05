import {ApolloServer} from "apollo-server-express";
import * as Express from "express";
import {buildSchema, Query, Resolver} from "type-graphql";
import "reflect-metadata";

@Resolver()
class HelloResolver {
    // resolver가 리턴하는 값. 대문자 String은 클래스를 의미한다.
    // options에 name으로 함수 이름을 따로 지정할 수 있다.
    // @Query(() => String, {nullable = true}) 하면 리턴값에 null이 허용된다.
    @Query(() => String, {name: 'helloWorld'})
    // 함수의 이름이 쿼리의 이름이 된다. playground에서 hello를 요청하면 값을 리턴한다.
    async hello() {
        return "hello world!";
    }
}

const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver],
    });
    const apolloServer = new ApolloServer({schema});

    const app = Express();

    apolloServer.applyMiddleware({app});

    app.listen(4000, () => {
        console.log('server started on http://localhost:4000/graphql');
    })
};

main();