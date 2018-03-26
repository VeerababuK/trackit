/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrackitTestModule } from '../../../test.module';
import { DefectMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/defect-my-suffix/defect-my-suffix-detail.component';
import { DefectMySuffixService } from '../../../../../../main/webapp/app/entities/defect-my-suffix/defect-my-suffix.service';
import { DefectMySuffix } from '../../../../../../main/webapp/app/entities/defect-my-suffix/defect-my-suffix.model';

describe('Component Tests', () => {

    describe('DefectMySuffix Management Detail Component', () => {
        let comp: DefectMySuffixDetailComponent;
        let fixture: ComponentFixture<DefectMySuffixDetailComponent>;
        let service: DefectMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [DefectMySuffixDetailComponent],
                providers: [
                    DefectMySuffixService
                ]
            })
            .overrideTemplate(DefectMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DefectMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DefectMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DefectMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.defect).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
