import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCopyComponent } from './card-copy.component';

describe('CardCopyComponent', () => {
  let component: CardCopyComponent;
  let fixture: ComponentFixture<CardCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCopyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
