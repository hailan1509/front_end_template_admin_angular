import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'parseSelect' })
export class ParseSelectPipe implements PipeTransform {
  transform(data : any, identifyKey: any, options: any): any {
    if (Array.isArray(data)) {
      return data.map(item => options.find((op: any) => op[identifyKey] === item) || {identifyKey: item});
    } else {
      return options.find((op: any) => op[identifyKey] === data) || {identifyKey: data };
    }
  }}
