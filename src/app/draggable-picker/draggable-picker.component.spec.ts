import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablePickerComponent } from './draggable-picker.component';

describe('DraggablePickerComponent', () => {
  let component: DraggablePickerComponent;
  let fixture: ComponentFixture<DraggablePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraggablePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggablePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
