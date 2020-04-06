import {Arg, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import * as bcrypt from 'bcryptjs';
import {User} from "../../entity/User";

@Resolver(User) // FieldResolver에서 사용할 타입을 넘긴다.
export class RegisterResolver {
    // gql은 종종 쿼리나 스키마가 없을 때 까다로워지는 경우가 있어 아래는 사용은 안하지만 남겨놓는다.
    @Query(() => String, {name: 'helloWorld'})
    async hello() {
        return "hello world!";
    }

    @FieldResolver()
    // 최상단의 @Resolver에서 User를 넘기고 있으므로 User를 사용할 수 있게 되었다.
    // @Root 애너테이션을 이용해 parent에 User 타입을 지정한다.
    async name(@Root() parent: User) {
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Mutation(() => User) // 여기서의 타입은 스키마에서의 타입이다.
    // @Arg('argument 이름 즉, graphql 스키마에서의 이름') 변수 이름: 타입
    async register(
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<User> {  // 함수의 리턴 타입일 뿐 스키마에 영향을 주는 것은 아니다.
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        return user;
    }
}