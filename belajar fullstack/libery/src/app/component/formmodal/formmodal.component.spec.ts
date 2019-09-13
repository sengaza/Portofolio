import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmodalComponent } from './formmodal.component';

describe('FormmodalComponent', () => {
  let component: FormmodalComponent;
  let fixture: ComponentFixture<FormmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
