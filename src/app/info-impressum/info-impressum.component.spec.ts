import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoImpressumComponent } from './info-impressum.component';

describe('InfoImpressumComponent', () => {
  let component: InfoImpressumComponent;
  let fixture: ComponentFixture<InfoImpressumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoImpressumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoImpressumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
