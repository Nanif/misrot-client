import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBossComponent } from './detail-boss.component';

describe('DetailBossComponent', () => {
  let component: DetailBossComponent;
  let fixture: ComponentFixture<DetailBossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
