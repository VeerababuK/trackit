import { BaseEntity } from './../../shared';

export class FeatureMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public featureName?: string,
        public description?: string,
        public state?: string,
        public note?: string,
        public epicId?: number,
        public milestoneId?: number,
        public releaseXId?: number,
        public stories?: BaseEntity[],
        public memberId?: number,
    ) {
    }
}
