/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrackitTestModule } from '../../../test.module';
import { EpicMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/epic-my-suffix/epic-my-suffix-detail.component';
import { EpicMySuffixService } from '../../../../../../main/webapp/app/entities/epic-my-suffix/epic-my-suffix.service';
import { EpicMySuffix } from '../../../../../../main/webapp/app/entities/epic-my-suffix/epic-my-suffix.model';

describe('Component Tests', () => {

    describe('EpicMySuffix Management Detail Component', () => {
        let comp: EpicMySuffixDetailComponent;
        let fixture: ComponentFixture<EpicMySuffixDetailComponent>;
        let service: EpicMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [EpicMySuffixDetailComponent],
                providers: [
                    EpicMySuffixService
                ]
            })
            .overrideTemplate(EpicMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EpicMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EpicMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EpicMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.epic).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
