/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrackitTestModule } from '../../../test.module';
import { ReleaseXMySuffixComponent } from '../../../../../../main/webapp/app/entities/release-x-my-suffix/release-x-my-suffix.component';
import { ReleaseXMySuffixService } from '../../../../../../main/webapp/app/entities/release-x-my-suffix/release-x-my-suffix.service';
import { ReleaseXMySuffix } from '../../../../../../main/webapp/app/entities/release-x-my-suffix/release-x-my-suffix.model';

describe('Component Tests', () => {

    describe('ReleaseXMySuffix Management Component', () => {
        let comp: ReleaseXMySuffixComponent;
        let fixture: ComponentFixture<ReleaseXMySuffixComponent>;
        let service: ReleaseXMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [ReleaseXMySuffixComponent],
                providers: [
                    ReleaseXMySuffixService
                ]
            })
            .overrideTemplate(ReleaseXMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReleaseXMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReleaseXMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReleaseXMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.releaseXES[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
