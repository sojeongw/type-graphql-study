import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";

// Register.ts의 함수에서 타입으로 사용하기 위해 ObjectType으로 지정해준다.
@ObjectType()
// 엔티티를 정의한다.
@Entity()
export class User extends BaseEntity {   // BaseEntity를 상속하면 user.create, user.update와 같은 함수를 사용할 수 있다.
    // 쿼리에 허용할 필드에 @Field 애너테이션을 붙인다.
    // 보통 graphql은 typescript에서 명시한 타입으로 타입을 인식하지만 모든 것을 다 처리하지는 못한다.
    // 예를 들어 아래의 ID는 number가 integer인지 double인지 혼란스럽다.
    // 그래서 type-graphql의 ID 타입을 지정해줄 수 있다.
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column("text", {unique: true})
    email: string;

    @Field()
    name: string;

    // password는 쿼리로 노출되면 안되므로 @Field 애너테이션을 붙이지 않는다.
    @Column()
    password: string;
}