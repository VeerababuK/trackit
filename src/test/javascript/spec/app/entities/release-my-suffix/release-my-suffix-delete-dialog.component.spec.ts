/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TrackitTestModule } from '../../../test.module';
import { Release_MySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/release-my-suffix/release-my-suffix-delete-dialog.component';
import { Release_MySuffixService } from '../../../../../../main/webapp/app/entities/release-my-suffix/release-my-suffix.service';

describe('Component Tests', () => {

    describe('Release_MySuffix Management Delete Component', () => {
        let comp: Release_MySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<Release_MySuffixDeleteDialogComponent>;
        let service: Release_MySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [Release_MySuffixDeleteDialogComponent],
                providers: [
                    Release_MySuffixService
                ]
            })
            .overrideTemplate(Release_MySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Release_MySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Release_MySuffixService);
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
