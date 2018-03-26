import { BaseEntity } from './../../shared';

export class Release_MySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public releaseName?: string,
        public fromDate?: any,
        public toDate?: any,
        public note?: string,
    ) {
    }
}
