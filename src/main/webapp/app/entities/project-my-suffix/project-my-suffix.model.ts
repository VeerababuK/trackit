import { BaseEntity } from './../../shared';

export class ProjectMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public projectName?: string,
        public description?: string,
        public note?: string,
        public members?: BaseEntity[],
    ) {
    }
}
