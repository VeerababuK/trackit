import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TrackitCalendarMySuffixModule } from './calendar-my-suffix/calendar-my-suffix.module';
import { TrackitIterationMySuffixModule } from './iteration-my-suffix/iteration-my-suffix.module';
import { TrackitMilestoneMySuffixModule } from './milestone-my-suffix/milestone-my-suffix.module';
import { TrackitEpicMySuffixModule } from './epic-my-suffix/epic-my-suffix.module';
import { TrackitFeatureMySuffixModule } from './feature-my-suffix/feature-my-suffix.module';
import { TrackitStoryMySuffixModule } from './story-my-suffix/story-my-suffix.module';
import { TrackitTaskMySuffixModule } from './task-my-suffix/task-my-suffix.module';
import { TrackitDefectMySuffixModule } from './defect-my-suffix/defect-my-suffix.module';
import { TrackitProjectMySuffixModule } from './project-my-suffix/project-my-suffix.module';
import { TrackitMemberMySuffixModule } from './member-my-suffix/member-my-suffix.module';
import { TrackitDiscussionMySuffixModule } from './discussion-my-suffix/discussion-my-suffix.module';
import { TrackitTagMySuffixModule } from './tag-my-suffix/tag-my-suffix.module';
import { TrackitReleaseXMySuffixModule } from './release-x-my-suffix/release-x-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TrackitCalendarMySuffixModule,
        TrackitIterationMySuffixModule,
        TrackitMilestoneMySuffixModule,
        TrackitEpicMySuffixModule,
        TrackitFeatureMySuffixModule,
        TrackitStoryMySuffixModule,
        TrackitTaskMySuffixModule,
        TrackitDefectMySuffixModule,
        TrackitProjectMySuffixModule,
        TrackitMemberMySuffixModule,
        TrackitDiscussionMySuffixModule,
        TrackitTagMySuffixModule,
        TrackitReleaseXMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitEntityModule {}
