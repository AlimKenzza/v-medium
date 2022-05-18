import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupNewComponent } from './signup-new.component';

describe('SignupNewComponent', () => {
  let component: SignupNewComponent;
  let fixture: ComponentFixture<SignupNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
