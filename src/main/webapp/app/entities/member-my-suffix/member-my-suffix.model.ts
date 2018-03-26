import { BaseEntity } from './../../shared';

export class MemberMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public memberName?: string,
        public type?: string,
        public note?: string,
        public projectId?: number,
        public epics?: BaseEntity[],
        public features?: BaseEntity[],
        public stories?: BaseEntity[],
        public tasks?: BaseEntity[],
        public defects?: BaseEntity[],
    ) {
    }
}
