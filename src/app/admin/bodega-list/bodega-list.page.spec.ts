import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodegaListPage } from './bodega-list.page';

describe('BodegaListPage', () => {
  let component: BodegaListPage;
  let fixture: ComponentFixture<BodegaListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BodegaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
