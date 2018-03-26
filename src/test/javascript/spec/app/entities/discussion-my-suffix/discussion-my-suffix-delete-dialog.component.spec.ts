/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrackitTestModule } from '../../../test.module';
import { DiscussionMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/discussion-my-suffix/discussion-my-suffix-delete-dialog.component';
import { DiscussionMySuffixService } from '../../../../../../main/webapp/app/entities/discussion-my-suffix/discussion-my-suffix.service';

describe('Component Tests', () => {

    describe('DiscussionMySuffix Management Delete Component', () => {
        let comp: DiscussionMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DiscussionMySuffixDeleteDialogComponent>;
        let service: DiscussionMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [DiscussionMySuffixDeleteDialogComponent],
                providers: [
                    DiscussionMySuffixService
                ]
            })
            .overrideTemplate(DiscussionMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiscussionMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscussionMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
