import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarComponent } from './add.component';

describe('AddCarComponent', () => {
  let component: AddCarComponent;
  let fixture: ComponentFixture<AddCarComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
