/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrackitTestModule } from '../../../test.module';
import { DiscussionMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/discussion-my-suffix/discussion-my-suffix-detail.component';
import { DiscussionMySuffixService } from '../../../../../../main/webapp/app/entities/discussion-my-suffix/discussion-my-suffix.service';
import { DiscussionMySuffix } from '../../../../../../main/webapp/app/entities/discussion-my-suffix/discussion-my-suffix.model';

describe('Component Tests', () => {

    describe('DiscussionMySuffix Management Detail Component', () => {
        let comp: DiscussionMySuffixDetailComponent;
        let fixture: ComponentFixture<DiscussionMySuffixDetailComponent>;
        let service: DiscussionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [DiscussionMySuffixDetailComponent],
                providers: [
                    DiscussionMySuffixService
                ]
            })
            .overrideTemplate(DiscussionMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiscussionMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscussionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DiscussionMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.discussion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
