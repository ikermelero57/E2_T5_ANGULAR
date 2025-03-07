import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GodComponent } from './god.component';

describe('GodComponent', () => {
  let component: GodComponent;
  let fixture: ComponentFixture<GodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
