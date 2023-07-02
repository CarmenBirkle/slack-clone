import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDirektnachrichtenComponent } from './info-direktnachrichten.component';

describe('InfoDirektnachrichtenComponent', () => {
  let component: InfoDirektnachrichtenComponent;
  let fixture: ComponentFixture<InfoDirektnachrichtenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDirektnachrichtenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDirektnachrichtenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
