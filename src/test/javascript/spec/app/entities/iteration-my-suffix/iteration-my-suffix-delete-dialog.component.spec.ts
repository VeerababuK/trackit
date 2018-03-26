/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrackitTestModule } from '../../../test.module';
import { IterationMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/iteration-my-suffix/iteration-my-suffix-delete-dialog.component';
import { IterationMySuffixService } from '../../../../../../main/webapp/app/entities/iteration-my-suffix/iteration-my-suffix.service';

describe('Component Tests', () => {

    describe('IterationMySuffix Management Delete Component', () => {
        let comp: IterationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<IterationMySuffixDeleteDialogComponent>;
        let service: IterationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [IterationMySuffixDeleteDialogComponent],
                providers: [
                    IterationMySuffixService
                ]
            })
            .overrideTemplate(IterationMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IterationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IterationMySuffixService);
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