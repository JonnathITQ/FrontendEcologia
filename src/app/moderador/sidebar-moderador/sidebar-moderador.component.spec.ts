import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarModeradorComponent } from './sidebar-moderador.component';

describe('SidebarModeradorComponent', () => {
  let component: SidebarModeradorComponent;
  let fixture: ComponentFixture<SidebarModeradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarModeradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarModeradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
