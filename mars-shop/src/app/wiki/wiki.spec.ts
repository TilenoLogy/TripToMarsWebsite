import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Wiki } from './wiki';

describe('Wiki', () => {
  let component: Wiki;
  let fixture: ComponentFixture<Wiki>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wiki],
    }).compileComponents();

    fixture = TestBed.createComponent(Wiki);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
