import { BaseEntity } from './../../shared';

export class DefectMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public defectName?: string,
        public description?: string,
        public state?: string,
        public note?: string,
        public storyId?: number,
        public discussions?: BaseEntity[],
        public memberId?: number,
    ) {
    }
}
