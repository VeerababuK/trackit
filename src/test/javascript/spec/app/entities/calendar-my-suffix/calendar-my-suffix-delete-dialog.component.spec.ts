/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrackitTestModule } from '../../../test.module';
import { CalendarMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/calendar-my-suffix/calendar-my-suffix-delete-dialog.component';
import { CalendarMySuffixService } from '../../../../../../main/webapp/app/entities/calendar-my-suffix/calendar-my-suffix.service';

describe('Component Tests', () => {

    describe('CalendarMySuffix Management Delete Component', () => {
        let comp: CalendarMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CalendarMySuffixDeleteDialogComponent>;
        let service: CalendarMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [CalendarMySuffixDeleteDialogComponent],
                providers: [
                    CalendarMySuffixService
                ]
            })
            .overrideTemplate(CalendarMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CalendarMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CalendarMySuffixService);
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
