import { Repository, ObjectLiteral, Connection, JoinOptions, FindManyOptions } from "typeorm";
import { IPageOptions } from './../interface/attribute.interface';
import { ModelConstants, AliasQuery } from './../constants/model.constants';
import { BaseEntity } from './BaseEntity';

export class BaseRepository<T extends BaseEntity<U>, U extends ObjectLiteral> extends Repository<T> {
    constructor(
        public readonly connection: Connection
    ) {
        super();
    }

    getRepository(entity: string) {
        return this.connection.getRepository(entity);
    }

    get models() {
        return ModelConstants;
    }

    async getById(id: number): Promise<T> {
        return this.findOne({ where: { id } });
    }

    async getByOptions(
        options: U | U[],
        optionsJoin?: string[],
        findManyOptions?: FindManyOptions<T>
    ): Promise<T[]> {
        let findOptions = findManyOptions || {} as FindManyOptions<T>;
        if (options) findOptions.where = options;
        if (optionsJoin) findOptions.join = this.getJoinQuery(optionsJoin);
        return this.find(findOptions);
    }

    async getOneByOptions(options: U | U[], optionsJoin?: string[]): Promise<T> {
        return !optionsJoin || !optionsJoin.length ?
            this.findOne({ where: options }) :
            this.findOne({ where: options, join: this.getJoinQuery(optionsJoin) });
    }

    getPageOpts(opts: IPageOptions) {
        if (!opts || !opts.limit || !opts.page) return {};
        const take = opts.limit;
        const skip = (opts.page - 1) * opts.limit;
        return { take, skip };
    }

    getJoinQuery(optionsJoin: string[]) {
        let opts = {} as JoinOptions;
        opts.alias = AliasQuery;
        opts.leftJoinAndSelect = {};
        optionsJoin.map(opt => {
            opts.leftJoinAndSelect[opt] = `${opts.alias}.${opt}`
        })
        return opts;
    }

    filterOptionsPaging(opts: any) {
        if (!opts) return null;
        const filterPaging = (key, value) => {
            if (key == 'page' || key == 'limit') return undefined;
            return value;
        }
        const options = JSON.parse(JSON.stringify(opts, filterPaging));
        if (!Object.keys(options).length) return null;
        return options;
    }
}