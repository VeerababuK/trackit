/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TrackitTestModule } from '../../../test.module';
import { MemberMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/member-my-suffix/member-my-suffix-detail.component';
import { MemberMySuffixService } from '../../../../../../main/webapp/app/entities/member-my-suffix/member-my-suffix.service';
import { MemberMySuffix } from '../../../../../../main/webapp/app/entities/member-my-suffix/member-my-suffix.model';

describe('Component Tests', () => {

    describe('MemberMySuffix Management Detail Component', () => {
        let comp: MemberMySuffixDetailComponent;
        let fixture: ComponentFixture<MemberMySuffixDetailComponent>;
        let service: MemberMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [MemberMySuffixDetailComponent],
                providers: [
                    MemberMySuffixService
                ]
            })
            .overrideTemplate(MemberMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MemberMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MemberMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MemberMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.member).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
