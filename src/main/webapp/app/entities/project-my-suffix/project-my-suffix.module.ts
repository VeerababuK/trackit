import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    ProjectMySuffixService,
    ProjectMySuffixPopupService,
    ProjectMySuffixComponent,
    ProjectMySuffixDetailComponent,
    ProjectMySuffixDialogComponent,
    ProjectMySuffixPopupComponent,
    ProjectMySuffixDeletePopupComponent,
    ProjectMySuffixDeleteDialogComponent,
    projectRoute,
    projectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...projectRoute,
    ...projectPopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProjectMySuffixComponent,
        ProjectMySuffixDetailComponent,
        ProjectMySuffixDialogComponent,
        ProjectMySuffixDeleteDialogComponent,
        ProjectMySuffixPopupComponent,
        ProjectMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ProjectMySuffixComponent,
        ProjectMySuffixDialogComponent,
        ProjectMySuffixPopupComponent,
        ProjectMySuffixDeleteDialogComponent,
        ProjectMySuffixDeletePopupComponent,
    ],
    providers: [
        ProjectMySuffixService,
        ProjectMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitProjectMySuffixModule {}
