import { UserAttribute, IPageOptions } from './../interface/attribute.interface';
import { BaseRepository } from './../base/BaseRepository';
import { EntityRepository } from "typeorm";
import { User } from "../entity/User.entity";

@EntityRepository(User)
export class UserRepository extends BaseRepository<User, UserAttribute>  {
    getInfoUser(whereOptions: UserAttribute): Promise<User> {
        return this.getOneByOptions(whereOptions, ['role']);
    }

    getUsers(userAttr: UserAttribute, pageOpts?: IPageOptions): Promise<[User[], number]> {
        const page = this.getPageOpts(pageOpts);
        return this.findAndCount({ where: userAttr, ...page, relations: ['role'] });
    }

}