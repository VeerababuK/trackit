/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrackitTestModule } from '../../../test.module';
import { ReleaseXMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/release-x-my-suffix/release-x-my-suffix-detail.component';
import { ReleaseXMySuffixService } from '../../../../../../main/webapp/app/entities/release-x-my-suffix/release-x-my-suffix.service';
import { ReleaseXMySuffix } from '../../../../../../main/webapp/app/entities/release-x-my-suffix/release-x-my-suffix.model';

describe('Component Tests', () => {

    describe('ReleaseXMySuffix Management Detail Component', () => {
        let comp: ReleaseXMySuffixDetailComponent;
        let fixture: ComponentFixture<ReleaseXMySuffixDetailComponent>;
        let service: ReleaseXMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [ReleaseXMySuffixDetailComponent],
                providers: [
                    ReleaseXMySuffixService
                ]
            })
            .overrideTemplate(ReleaseXMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReleaseXMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReleaseXMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReleaseXMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.releaseX).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
