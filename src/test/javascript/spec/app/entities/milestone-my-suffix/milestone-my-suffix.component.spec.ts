/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrackitTestModule } from '../../../test.module';
import { MilestoneMySuffixComponent } from '../../../../../../main/webapp/app/entities/milestone-my-suffix/milestone-my-suffix.component';
import { MilestoneMySuffixService } from '../../../../../../main/webapp/app/entities/milestone-my-suffix/milestone-my-suffix.service';
import { MilestoneMySuffix } from '../../../../../../main/webapp/app/entities/milestone-my-suffix/milestone-my-suffix.model';

describe('Component Tests', () => {

    describe('MilestoneMySuffix Management Component', () => {
        let comp: MilestoneMySuffixComponent;
        let fixture: ComponentFixture<MilestoneMySuffixComponent>;
        let service: MilestoneMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [MilestoneMySuffixComponent],
                providers: [
                    MilestoneMySuffixService
                ]
            })
            .overrideTemplate(MilestoneMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MilestoneMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MilestoneMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MilestoneMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.milestones[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
