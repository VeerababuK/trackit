/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrackitTestModule } from '../../../test.module';
import { StoryMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/story-my-suffix/story-my-suffix-dialog.component';
import { StoryMySuffixService } from '../../../../../../main/webapp/app/entities/story-my-suffix/story-my-suffix.service';
import { StoryMySuffix } from '../../../../../../main/webapp/app/entities/story-my-suffix/story-my-suffix.model';
import { FeatureMySuffixService } from '../../../../../../main/webapp/app/entities/feature-my-suffix';
import { IterationMySuffixService } from '../../../../../../main/webapp/app/entities/iteration-my-suffix';
import { ReleaseXMySuffixService } from '../../../../../../main/webapp/app/entities/release-x-my-suffix';
import { MilestoneMySuffixService } from '../../../../../../main/webapp/app/entities/milestone-my-suffix';
import { MemberMySuffixService } from '../../../../../../main/webapp/app/entities/member-my-suffix';

describe('Component Tests', () => {

    describe('StoryMySuffix Management Dialog Component', () => {
        let comp: StoryMySuffixDialogComponent;
        let fixture: ComponentFixture<StoryMySuffixDialogComponent>;
        let service: StoryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [StoryMySuffixDialogComponent],
                providers: [
                    FeatureMySuffixService,
                    IterationMySuffixService,
                    ReleaseXMySuffixService,
                    MilestoneMySuffixService,
                    MemberMySuffixService,
                    StoryMySuffixService
                ]
            })
            .overrideTemplate(StoryMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoryMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoryMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StoryMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.story = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'storyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StoryMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.story = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'storyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
