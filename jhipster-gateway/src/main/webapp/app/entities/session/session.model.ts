import { BaseEntity } from './../../shared';

export class Session implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public descriptionContentType?: string,
        public description?: any,
        public startDateTime?: any,
        public endDateTime?: any,
        public speakers?: BaseEntity[],
    ) {
    }
}
