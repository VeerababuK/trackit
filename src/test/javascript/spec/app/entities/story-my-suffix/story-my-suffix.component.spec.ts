/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrackitTestModule } from '../../../test.module';
import { StoryMySuffixComponent } from '../../../../../../main/webapp/app/entities/story-my-suffix/story-my-suffix.component';
import { StoryMySuffixService } from '../../../../../../main/webapp/app/entities/story-my-suffix/story-my-suffix.service';
import { StoryMySuffix } from '../../../../../../main/webapp/app/entities/story-my-suffix/story-my-suffix.model';

describe('Component Tests', () => {

    describe('StoryMySuffix Management Component', () => {
        let comp: StoryMySuffixComponent;
        let fixture: ComponentFixture<StoryMySuffixComponent>;
        let service: StoryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [StoryMySuffixComponent],
                providers: [
                    StoryMySuffixService
                ]
            })
            .overrideTemplate(StoryMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoryMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StoryMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
