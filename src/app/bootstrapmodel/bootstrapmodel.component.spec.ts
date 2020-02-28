import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapmodelComponent } from './bootstrapmodel.component';

describe('BootstrapmodelComponent', () => {
  let component: BootstrapmodelComponent;
  let fixture: ComponentFixture<BootstrapmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
