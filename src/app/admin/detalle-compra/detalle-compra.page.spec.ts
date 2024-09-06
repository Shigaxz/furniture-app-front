import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleCompraPage } from './detalle-compra.page';

describe('DetalleCompraPage', () => {
  let component: DetalleCompraPage;
  let fixture: ComponentFixture<DetalleCompraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
