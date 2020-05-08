import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BurgerTestModule } from '../../../test.module';
import { BeerDetailComponent } from 'app/entities/beer/beer-detail.component';
import { Beer } from 'app/shared/model/beer.model';

describe('Component Tests', () => {
  describe('Beer Management Detail Component', () => {
    let comp: BeerDetailComponent;
    let fixture: ComponentFixture<BeerDetailComponent>;
    const route = ({ data: of({ beer: new Beer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BurgerTestModule],
        declarations: [BeerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BeerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BeerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load beer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.beer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
