/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrackitTestModule } from '../../../test.module';
import { EpicMySuffixComponent } from '../../../../../../main/webapp/app/entities/epic-my-suffix/epic-my-suffix.component';
import { EpicMySuffixService } from '../../../../../../main/webapp/app/entities/epic-my-suffix/epic-my-suffix.service';
import { EpicMySuffix } from '../../../../../../main/webapp/app/entities/epic-my-suffix/epic-my-suffix.model';

describe('Component Tests', () => {

    describe('EpicMySuffix Management Component', () => {
        let comp: EpicMySuffixComponent;
        let fixture: ComponentFixture<EpicMySuffixComponent>;
        let service: EpicMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [EpicMySuffixComponent],
                providers: [
                    EpicMySuffixService
                ]
            })
            .overrideTemplate(EpicMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EpicMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EpicMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EpicMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.epics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
