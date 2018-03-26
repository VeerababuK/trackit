/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrackitTestModule } from '../../../test.module';
import { DiscussionMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/discussion-my-suffix/discussion-my-suffix-dialog.component';
import { DiscussionMySuffixService } from '../../../../../../main/webapp/app/entities/discussion-my-suffix/discussion-my-suffix.service';
import { DiscussionMySuffix } from '../../../../../../main/webapp/app/entities/discussion-my-suffix/discussion-my-suffix.model';
import { EpicMySuffixService } from '../../../../../../main/webapp/app/entities/epic-my-suffix';
import { StoryMySuffixService } from '../../../../../../main/webapp/app/entities/story-my-suffix';
import { TaskMySuffixService } from '../../../../../../main/webapp/app/entities/task-my-suffix';
import { DefectMySuffixService } from '../../../../../../main/webapp/app/entities/defect-my-suffix';

describe('Component Tests', () => {

    describe('DiscussionMySuffix Management Dialog Component', () => {
        let comp: DiscussionMySuffixDialogComponent;
        let fixture: ComponentFixture<DiscussionMySuffixDialogComponent>;
        let service: DiscussionMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [DiscussionMySuffixDialogComponent],
                providers: [
                    EpicMySuffixService,
                    StoryMySuffixService,
                    TaskMySuffixService,
                    DefectMySuffixService,
                    DiscussionMySuffixService
                ]
            })
            .overrideTemplate(DiscussionMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiscussionMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscussionMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DiscussionMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.discussion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'discussionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DiscussionMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.discussion = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'discussionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
