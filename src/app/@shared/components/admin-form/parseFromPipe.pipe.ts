import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'parseFrom' })
export class ParseFromPipe implements PipeTransform {
  transform(data : any, identifyKey: any, options: any): any {
    if (Array.isArray(data)) {
      return data.map(item => options.find((op: any) => op[identifyKey] === item) || {identifyKey: item});
    } else {
      return options.find((op: any) => op[identifyKey] === data) || {identifyKey: data };
    }
  }}
