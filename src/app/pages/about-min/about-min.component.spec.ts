import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMinComponent } from './about-min.component';

describe('AboutMinComponent', () => {
  let component: AboutMinComponent;
  let fixture: ComponentFixture<AboutMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
