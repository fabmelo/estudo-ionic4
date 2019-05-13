import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksItemComponent } from './tasks-item.component';

describe('TasksItemComponent', () => {
  let component: TasksItemComponent;
  let fixture: ComponentFixture<TasksItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
