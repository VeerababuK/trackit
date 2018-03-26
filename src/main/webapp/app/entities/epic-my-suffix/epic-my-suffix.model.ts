import { BaseEntity } from './../../shared';

export class EpicMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public epicName?: string,
        public description?: string,
        public state?: string,
        public note?: string,
        public releaseXId?: number,
        public milestoneId?: number,
        public features?: BaseEntity[],
        public tags?: BaseEntity[],
        public discussions?: BaseEntity[],
        public memberId?: number,
    ) {
    }
}
