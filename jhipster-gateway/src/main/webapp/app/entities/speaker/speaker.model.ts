import { BaseEntity } from './../../shared';

export class Speaker implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public twitter?: string,
        public bioContentType?: string,
        public bio?: any,
        public sessions?: BaseEntity[],
    ) {
    }
}
