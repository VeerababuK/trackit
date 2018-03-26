import { BaseEntity } from './../../shared';

export class MilestoneMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public milestoneName?: string,
        public date?: any,
        public note?: string,
    ) {
    }
}
