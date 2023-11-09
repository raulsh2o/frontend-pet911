import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TwoPartAuthPage } from './two-part-auth.page';

describe('TwoPartAuthPage', () => {
  let component: TwoPartAuthPage;
  let fixture: ComponentFixture<TwoPartAuthPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TwoPartAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
