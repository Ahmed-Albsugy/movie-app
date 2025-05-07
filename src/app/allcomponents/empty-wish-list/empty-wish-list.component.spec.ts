import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyWishListComponent } from './empty-wish-list.component';

describe('EmptyWishListComponent', () => {
  let component: EmptyWishListComponent;
  let fixture: ComponentFixture<EmptyWishListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyWishListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
