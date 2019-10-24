import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { VMessageModule } from 'src/app/shared/componets/vmessage/vmessage.module';
import { InmediateClickModule } from 'src/app/shared/directives/inmediate-click/inmediate-click.module';

import { PhotoModule } from '../photo/photo.module';
import { PhotoFormComponent } from './photo-form.component';

describe('PhotoFormComponent', () => {
  let component: PhotoFormComponent;
  let fixture: ComponentFixture<PhotoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        VMessageModule,
        RouterTestingModule.withRoutes([]),
        PhotoModule,
        InmediateClickModule
      ],
      declarations: [PhotoFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
