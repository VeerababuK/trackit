/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrackitTestModule } from '../../../test.module';
import { MilestoneMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/milestone-my-suffix/milestone-my-suffix-detail.component';
import { MilestoneMySuffixService } from '../../../../../../main/webapp/app/entities/milestone-my-suffix/milestone-my-suffix.service';
import { MilestoneMySuffix } from '../../../../../../main/webapp/app/entities/milestone-my-suffix/milestone-my-suffix.model';

describe('Component Tests', () => {

    describe('MilestoneMySuffix Management Detail Component', () => {
        let comp: MilestoneMySuffixDetailComponent;
        let fixture: ComponentFixture<MilestoneMySuffixDetailComponent>;
        let service: MilestoneMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [MilestoneMySuffixDetailComponent],
                providers: [
                    MilestoneMySuffixService
                ]
            })
            .overrideTemplate(MilestoneMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MilestoneMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MilestoneMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MilestoneMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.milestone).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
