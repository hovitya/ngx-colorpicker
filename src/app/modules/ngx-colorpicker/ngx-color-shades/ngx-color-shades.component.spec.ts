import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxColorShadesComponent } from './ngx-color-shades.component';

describe('NgxColorShadesComponent', () => {
  let component: NgxColorShadesComponent;
  let fixture: ComponentFixture<NgxColorShadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxColorShadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxColorShadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
