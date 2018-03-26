/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrackitTestModule } from '../../../test.module';
import { DefectMySuffixComponent } from '../../../../../../main/webapp/app/entities/defect-my-suffix/defect-my-suffix.component';
import { DefectMySuffixService } from '../../../../../../main/webapp/app/entities/defect-my-suffix/defect-my-suffix.service';
import { DefectMySuffix } from '../../../../../../main/webapp/app/entities/defect-my-suffix/defect-my-suffix.model';

describe('Component Tests', () => {

    describe('DefectMySuffix Management Component', () => {
        let comp: DefectMySuffixComponent;
        let fixture: ComponentFixture<DefectMySuffixComponent>;
        let service: DefectMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [DefectMySuffixComponent],
                providers: [
                    DefectMySuffixService
                ]
            })
            .overrideTemplate(DefectMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DefectMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefectMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DefectMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.defects[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
