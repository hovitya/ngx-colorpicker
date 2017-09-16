import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxColorpickerComponent } from './ngx-colorpicker.component';

describe('NgxColorpickerComponent', () => {
  let component: NgxColorpickerComponent;
  let fixture: ComponentFixture<NgxColorpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxColorpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxColorpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
