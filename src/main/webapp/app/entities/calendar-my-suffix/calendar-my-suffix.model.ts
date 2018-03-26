import { BaseEntity } from './../../shared';

export class CalendarMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public day?: string,
        public weekend?: boolean,
        public month?: number,
        public year?: number,
        public holiday?: boolean,
    ) {
        this.weekend = false;
        this.holiday = false;
    }
}
