import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoErinnerungenComponent } from './info-erinnerungen.component';

describe('InfoErinnerungenComponent', () => {
  let component: InfoErinnerungenComponent;
  let fixture: ComponentFixture<InfoErinnerungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoErinnerungenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoErinnerungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
