import { BaseEntity } from './../../shared';

export class IterationMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public iterationName?: string,
        public fromDate?: any,
        public toDate?: any,
    ) {
    }
}
