/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrackitTestModule } from '../../../test.module';
import { TagMySuffixComponent } from '../../../../../../main/webapp/app/entities/tag-my-suffix/tag-my-suffix.component';
import { TagMySuffixService } from '../../../../../../main/webapp/app/entities/tag-my-suffix/tag-my-suffix.service';
import { TagMySuffix } from '../../../../../../main/webapp/app/entities/tag-my-suffix/tag-my-suffix.model';

describe('Component Tests', () => {

    describe('TagMySuffix Management Component', () => {
        let comp: TagMySuffixComponent;
        let fixture: ComponentFixture<TagMySuffixComponent>;
        let service: TagMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [TagMySuffixComponent],
                providers: [
                    TagMySuffixService
                ]
            })
            .overrideTemplate(TagMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TagMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tags[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
