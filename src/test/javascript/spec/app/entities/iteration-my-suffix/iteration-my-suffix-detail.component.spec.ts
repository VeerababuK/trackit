/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrackitTestModule } from '../../../test.module';
import { IterationMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/iteration-my-suffix/iteration-my-suffix-detail.component';
import { IterationMySuffixService } from '../../../../../../main/webapp/app/entities/iteration-my-suffix/iteration-my-suffix.service';
import { IterationMySuffix } from '../../../../../../main/webapp/app/entities/iteration-my-suffix/iteration-my-suffix.model';

describe('Component Tests', () => {

    describe('IterationMySuffix Management Detail Component', () => {
        let comp: IterationMySuffixDetailComponent;
        let fixture: ComponentFixture<IterationMySuffixDetailComponent>;
        let service: IterationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [IterationMySuffixDetailComponent],
                providers: [
                    IterationMySuffixService
                ]
            })
            .overrideTemplate(IterationMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IterationMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IterationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new IterationMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.iteration).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
