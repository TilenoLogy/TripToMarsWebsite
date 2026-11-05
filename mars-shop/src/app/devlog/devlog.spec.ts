import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Devlog } from './devlog';

describe('Devlog', () => {
  let component: Devlog;
  let fixture: ComponentFixture<Devlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Devlog],
    }).compileComponents();

    fixture = TestBed.createComponent(Devlog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
