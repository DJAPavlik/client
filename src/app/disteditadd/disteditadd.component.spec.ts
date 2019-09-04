import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisteditaddComponent } from './disteditadd.component';

describe('DisteditaddComponent', () => {
  let component: DisteditaddComponent;
  let fixture: ComponentFixture<DisteditaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisteditaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisteditaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
