/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrackitTestModule } from '../../../test.module';
import { ReleaseXMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/release-x-my-suffix/release-x-my-suffix-delete-dialog.component';
import { ReleaseXMySuffixService } from '../../../../../../main/webapp/app/entities/release-x-my-suffix/release-x-my-suffix.service';

describe('Component Tests', () => {

    describe('ReleaseXMySuffix Management Delete Component', () => {
        let comp: ReleaseXMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ReleaseXMySuffixDeleteDialogComponent>;
        let service: ReleaseXMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [ReleaseXMySuffixDeleteDialogComponent],
                providers: [
                    ReleaseXMySuffixService
                ]
            })
            .overrideTemplate(ReleaseXMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReleaseXMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReleaseXMySuffixService);
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
