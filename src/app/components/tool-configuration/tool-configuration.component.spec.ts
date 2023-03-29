import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolConfigurationComponent } from './tool-configuration.component';

describe('ToolConfigurationComponent', () => {
  let component: ToolConfigurationComponent;
  let fixture: ComponentFixture<ToolConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
