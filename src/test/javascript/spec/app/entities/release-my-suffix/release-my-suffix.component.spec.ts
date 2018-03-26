/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrackitTestModule } from '../../../test.module';
import { Release_MySuffixComponent } from '../../../../../../main/webapp/app/entities/release-my-suffix/release-my-suffix.component';
import { Release_MySuffixService } from '../../../../../../main/webapp/app/entities/release-my-suffix/release-my-suffix.service';
import { Release_MySuffix } from '../../../../../../main/webapp/app/entities/release-my-suffix/release-my-suffix.model';

describe('Component Tests', () => {

    describe('Release_MySuffix Management Component', () => {
        let comp: Release_MySuffixComponent;
        let fixture: ComponentFixture<Release_MySuffixComponent>;
        let service: Release_MySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [Release_MySuffixComponent],
                providers: [
                    Release_MySuffixService
                ]
            })
            .overrideTemplate(Release_MySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Release_MySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Release_MySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Release_MySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.release_S[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
