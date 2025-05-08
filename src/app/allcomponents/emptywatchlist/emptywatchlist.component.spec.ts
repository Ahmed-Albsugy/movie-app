import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptywatchlistComponent } from './emptywatchlist.component';

describe('EmptywatchlistComponent', () => {
  let component: EmptywatchlistComponent;
  let fixture: ComponentFixture<EmptywatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptywatchlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptywatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
