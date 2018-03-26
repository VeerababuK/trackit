import { BaseEntity } from './../../shared';

export class DiscussionMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public discussionText?: string,
        public epicId?: number,
        public storyId?: number,
        public taskId?: number,
        public defectId?: number,
    ) {
    }
}
