import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistselComponent } from './distsel.component';

describe('DistselComponent', () => {
  let component: DistselComponent;
  let fixture: ComponentFixture<DistselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
