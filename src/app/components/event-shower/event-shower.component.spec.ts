import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventShowerComponent } from './event-shower.component';

describe('EventShowerComponent', () => {
  let component: EventShowerComponent;
  let fixture: ComponentFixture<EventShowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventShowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
