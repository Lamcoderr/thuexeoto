import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCarsComponent } from './cars.component';

describe('UserCarsComponent', () => {
  let component: UserCarsComponent;
  let fixture: ComponentFixture<UserCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCarsComponent]   // Standalone component
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
