/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrackitTestModule } from '../../../test.module';
import { StoryMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/story-my-suffix/story-my-suffix-detail.component';
import { StoryMySuffixService } from '../../../../../../main/webapp/app/entities/story-my-suffix/story-my-suffix.service';
import { StoryMySuffix } from '../../../../../../main/webapp/app/entities/story-my-suffix/story-my-suffix.model';

describe('Component Tests', () => {

    describe('StoryMySuffix Management Detail Component', () => {
        let comp: StoryMySuffixDetailComponent;
        let fixture: ComponentFixture<StoryMySuffixDetailComponent>;
        let service: StoryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [StoryMySuffixDetailComponent],
                providers: [
                    StoryMySuffixService
                ]
            })
            .overrideTemplate(StoryMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoryMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StoryMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.story).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
