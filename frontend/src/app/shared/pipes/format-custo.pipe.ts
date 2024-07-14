import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCusto',
  standalone: true,
})
export class FormatCustoPipe implements PipeTransform {
  transform(value: string | number): string {
    let _value: string = Number(value).toFixed(2).toString();

    _value = _value.replace(',', 'X').replace('.', ',').replace('X', ',');

    return _value;
  }
}
