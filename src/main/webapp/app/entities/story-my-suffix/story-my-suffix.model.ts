import { BaseEntity } from './../../shared';

export class StoryMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public storyName?: string,
        public description?: string,
        public state?: string,
        public note?: string,
        public featureId?: number,
        public iterationId?: number,
        public releaseXId?: number,
        public milestoneId?: number,
        public tasks?: BaseEntity[],
        public storyId?: number,
        public children?: BaseEntity[],
        public defects?: BaseEntity[],
        public tags?: BaseEntity[],
        public discussions?: BaseEntity[],
        public memberId?: number,
    ) {
    }
}
