import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnalyserComponent } from './text-analyser.component';

describe('TextAnalyserComponent', () => {
  let component: TextAnalyserComponent;
  let fixture: ComponentFixture<TextAnalyserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAnalyserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAnalyserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
