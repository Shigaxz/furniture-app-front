import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaListPage } from './categoria-list.page';

describe('CategoriaListPage', () => {
  let component: CategoriaListPage;
  let fixture: ComponentFixture<CategoriaListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CategoriaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
