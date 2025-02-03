import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSchoolComponent } from './details-school.component';

describe('DetailsSchoolComponent', () => {
  let component: DetailsSchoolComponent;
  let fixture: ComponentFixture<DetailsSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsSchoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
