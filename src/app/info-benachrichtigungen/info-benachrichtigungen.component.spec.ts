import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBenachrichtigungenComponent } from './info-benachrichtigungen.component';

describe('InfoBenachrichtigungenComponent', () => {
  let component: InfoBenachrichtigungenComponent;
  let fixture: ComponentFixture<InfoBenachrichtigungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBenachrichtigungenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoBenachrichtigungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
