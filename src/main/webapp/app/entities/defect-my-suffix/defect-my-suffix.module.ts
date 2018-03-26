import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    DefectMySuffixService,
    DefectMySuffixPopupService,
    DefectMySuffixComponent,
    DefectMySuffixDetailComponent,
    DefectMySuffixDialogComponent,
    DefectMySuffixPopupComponent,
    DefectMySuffixDeletePopupComponent,
    DefectMySuffixDeleteDialogComponent,
    defectRoute,
    defectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...defectRoute,
    ...defectPopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DefectMySuffixComponent,
        DefectMySuffixDetailComponent,
        DefectMySuffixDialogComponent,
        DefectMySuffixDeleteDialogComponent,
        DefectMySuffixPopupComponent,
        DefectMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DefectMySuffixComponent,
        DefectMySuffixDialogComponent,
        DefectMySuffixPopupComponent,
        DefectMySuffixDeleteDialogComponent,
        DefectMySuffixDeletePopupComponent,
    ],
    providers: [
        DefectMySuffixService,
        DefectMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitDefectMySuffixModule {}
