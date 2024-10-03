import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomasBrasileirosComponent } from './biomas-brasileiros.component';

describe('BiomasBrasileirosComponent', () => {
  let component: BiomasBrasileirosComponent;
  let fixture: ComponentFixture<BiomasBrasileirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomasBrasileirosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiomasBrasileirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
