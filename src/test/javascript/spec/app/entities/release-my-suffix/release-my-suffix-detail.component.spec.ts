/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrackitTestModule } from '../../../test.module';
import { Release_MySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/release-my-suffix/release-my-suffix-detail.component';
import { Release_MySuffixService } from '../../../../../../main/webapp/app/entities/release-my-suffix/release-my-suffix.service';
import { Release_MySuffix } from '../../../../../../main/webapp/app/entities/release-my-suffix/release-my-suffix.model';

describe('Component Tests', () => {

    describe('Release_MySuffix Management Detail Component', () => {
        let comp: Release_MySuffixDetailComponent;
        let fixture: ComponentFixture<Release_MySuffixDetailComponent>;
        let service: Release_MySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [Release_MySuffixDetailComponent],
                providers: [
                    Release_MySuffixService
                ]
            })
            .overrideTemplate(Release_MySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Release_MySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Release_MySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Release_MySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.release_).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
