import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchListCardComponent } from './watch-list-card.component';

describe('WatchListCardComponent', () => {
  let component: WatchListCardComponent;
  let fixture: ComponentFixture<WatchListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
