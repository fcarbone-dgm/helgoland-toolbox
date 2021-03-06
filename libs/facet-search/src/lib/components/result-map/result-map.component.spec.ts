import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HelgolandMapModule } from '@helgoland/map';

import { HelgolandFacetSearchModule } from '../../facet-search.module';
import { FacetSearchService } from '../../facet-search.service';
import { ResultMapComponent } from './result-map.component';

describe('ResultMapComponent', () => {
  let component: ResultMapComponent;
  let fixture: ComponentFixture<ResultMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HelgolandMapModule, HelgolandFacetSearchModule],
      declarations: []
    }).compileComponents();
  }));

  beforeEach(inject([FacetSearchService], (service: FacetSearchService) => {
    fixture = TestBed.createComponent(ResultMapComponent);
    component = fixture.componentInstance;
    component.facetSearchService = service;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
