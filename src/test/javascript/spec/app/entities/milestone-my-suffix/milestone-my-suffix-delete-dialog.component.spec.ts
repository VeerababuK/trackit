/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrackitTestModule } from '../../../test.module';
import { MilestoneMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/milestone-my-suffix/milestone-my-suffix-delete-dialog.component';
import { MilestoneMySuffixService } from '../../../../../../main/webapp/app/entities/milestone-my-suffix/milestone-my-suffix.service';

describe('Component Tests', () => {

    describe('MilestoneMySuffix Management Delete Component', () => {
        let comp: MilestoneMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<MilestoneMySuffixDeleteDialogComponent>;
        let service: MilestoneMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [MilestoneMySuffixDeleteDialogComponent],
                providers: [
                    MilestoneMySuffixService
                ]
            })
            .overrideTemplate(MilestoneMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MilestoneMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MilestoneMySuffixService);
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
