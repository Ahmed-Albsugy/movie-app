import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCrdComponent } from './movie-crd.component';

describe('MovieCrdComponent', () => {
  let component: MovieCrdComponent;
  let fixture: ComponentFixture<MovieCrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCrdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
