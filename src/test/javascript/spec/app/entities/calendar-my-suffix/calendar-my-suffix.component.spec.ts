/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrackitTestModule } from '../../../test.module';
import { CalendarMySuffixComponent } from '../../../../../../main/webapp/app/entities/calendar-my-suffix/calendar-my-suffix.component';
import { CalendarMySuffixService } from '../../../../../../main/webapp/app/entities/calendar-my-suffix/calendar-my-suffix.service';
import { CalendarMySuffix } from '../../../../../../main/webapp/app/entities/calendar-my-suffix/calendar-my-suffix.model';

describe('Component Tests', () => {

    describe('CalendarMySuffix Management Component', () => {
        let comp: CalendarMySuffixComponent;
        let fixture: ComponentFixture<CalendarMySuffixComponent>;
        let service: CalendarMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [CalendarMySuffixComponent],
                providers: [
                    CalendarMySuffixService
                ]
            })
            .overrideTemplate(CalendarMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CalendarMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CalendarMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CalendarMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.calendars[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
