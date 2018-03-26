import { BaseEntity } from './../../shared';

export class TaskMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public taskName?: string,
        public description?: string,
        public state?: string,
        public note?: string,
        public storyId?: number,
        public iterationId?: number,
        public releaseXId?: number,
        public tags?: BaseEntity[],
        public discussions?: BaseEntity[],
        public memberId?: number,
    ) {
    }
}
