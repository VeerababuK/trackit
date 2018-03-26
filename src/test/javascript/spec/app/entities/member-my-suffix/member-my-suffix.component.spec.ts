/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrackitTestModule } from '../../../test.module';
import { MemberMySuffixComponent } from '../../../../../../main/webapp/app/entities/member-my-suffix/member-my-suffix.component';
import { MemberMySuffixService } from '../../../../../../main/webapp/app/entities/member-my-suffix/member-my-suffix.service';
import { MemberMySuffix } from '../../../../../../main/webapp/app/entities/member-my-suffix/member-my-suffix.model';

describe('Component Tests', () => {

    describe('MemberMySuffix Management Component', () => {
        let comp: MemberMySuffixComponent;
        let fixture: ComponentFixture<MemberMySuffixComponent>;
        let service: MemberMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackitTestModule],
                declarations: [MemberMySuffixComponent],
                providers: [
                    MemberMySuffixService
                ]
            })
            .overrideTemplate(MemberMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MemberMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MemberMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MemberMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.members[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
