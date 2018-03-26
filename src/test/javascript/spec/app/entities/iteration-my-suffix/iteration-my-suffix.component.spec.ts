/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrackitTestModule } from '../../../test.module';
import { IterationMySuffixComponent } from '../../../../../../main/webapp/app/entities/iteration-my-suffix/iteration-my-suffix.component';
import { IterationMySuffixService } from '../../../../../../main/webapp/app/entities/iteration-my-suffix/iteration-my-suffix.service';
import { IterationMySuffix } from '../../../../../../main/webapp/app/entities/iteration-my-suffix/iteration-my-suffix.model';

describe('Component Tests', () => {

    describe('IterationMySuffix Management Component', () => {
        let comp: IterationMySuffixComponent;
        let fixture: ComponentFixture<IterationMySuffixComponent>;
        let service: IterationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [IterationMySuffixComponent],
                providers: [
                    IterationMySuffixService
                ]
            })
            .overrideTemplate(IterationMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IterationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IterationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new IterationMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.iterations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
