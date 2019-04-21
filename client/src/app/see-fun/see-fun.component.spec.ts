import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeFunComponent } from './see-fun.component';

describe('SeeFunComponent', () => {
  let component: SeeFunComponent;
  let fixture: ComponentFixture<SeeFunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeFunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeFunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
