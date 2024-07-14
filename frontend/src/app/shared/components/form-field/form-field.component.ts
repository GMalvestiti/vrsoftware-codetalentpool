import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EFieldType } from '../../enums/field-type.enum';
import { controlErrorMessages } from '../../helpers/form-error.helper';
import { fileToBase64 } from '../../helpers/image.helper';
import { IFormField } from '../../interfaces/form-field.interface';

const form = [ReactiveFormsModule, FormsModule];
const components = [
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
];

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [...form, ...components, CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input({ required: true }) field!: IFormField;
  @Input({ required: true }) form!: FormGroup;

  readonly typeInput = EFieldType.INPUT;
  readonly typeSelect = EFieldType.SELECT;
  readonly typeImage = EFieldType.IMAGE;

  get label(): string {
    const isRequired = !!this.control?.hasValidator(Validators.required);

    return `${this.field.label}${isRequired ? ' *' : ''}`;
  }

  get control(): AbstractControl | null {
    if (!this.field || !this.form) return null;

    return this.form.get(this.field.formControlName);
  }

  get error(): string {
    if (!this.control || !this.control.touched) return '';

    return controlErrorMessages(this.control);
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.item(0);

    if (file && file instanceof File) {
      fileToBase64(file)
        .then(base64String => {
          this.form.patchValue({ [this.field.formControlName]: base64String });
        })
        .catch(error => {
          console.error('Error converting file to base64:', error);
        });
    }
  }
}
