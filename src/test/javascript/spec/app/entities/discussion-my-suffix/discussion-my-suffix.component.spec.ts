/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrackitTestModule } from '../../../test.module';
import { DiscussionMySuffixComponent } from '../../../../../../main/webapp/app/entities/discussion-my-suffix/discussion-my-suffix.component';
import { DiscussionMySuffixService } from '../../../../../../main/webapp/app/entities/discussion-my-suffix/discussion-my-suffix.service';
import { DiscussionMySuffix } from '../../../../../../main/webapp/app/entities/discussion-my-suffix/discussion-my-suffix.model';

describe('Component Tests', () => {

    describe('DiscussionMySuffix Management Component', () => {
        let comp: DiscussionMySuffixComponent;
        let fixture: ComponentFixture<DiscussionMySuffixComponent>;
        let service: DiscussionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [DiscussionMySuffixComponent],
                providers: [
                    DiscussionMySuffixService
                ]
            })
            .overrideTemplate(DiscussionMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiscussionMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscussionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DiscussionMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.discussions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
