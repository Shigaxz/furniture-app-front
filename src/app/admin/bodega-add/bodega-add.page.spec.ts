import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodegaAddPage } from './bodega-add.page';

describe('BodegaAddPage', () => {
  let component: BodegaAddPage;
  let fixture: ComponentFixture<BodegaAddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BodegaAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
