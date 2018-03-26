/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrackitTestModule } from '../../../test.module';
import { CalendarMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/calendar-my-suffix/calendar-my-suffix-detail.component';
import { CalendarMySuffixService } from '../../../../../../main/webapp/app/entities/calendar-my-suffix/calendar-my-suffix.service';
import { CalendarMySuffix } from '../../../../../../main/webapp/app/entities/calendar-my-suffix/calendar-my-suffix.model';

describe('Component Tests', () => {

    describe('CalendarMySuffix Management Detail Component', () => {
        let comp: CalendarMySuffixDetailComponent;
        let fixture: ComponentFixture<CalendarMySuffixDetailComponent>;
        let service: CalendarMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [CalendarMySuffixDetailComponent],
                providers: [
                    CalendarMySuffixService
                ]
            })
            .overrideTemplate(CalendarMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CalendarMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CalendarMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CalendarMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.calendar).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
