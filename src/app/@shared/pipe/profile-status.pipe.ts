import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
  name : 'profileStatus'
})
export class ProfileStatusPipe implements PipeTransform {
  transform(val: number): string {
    switch (val) {
      case -1:
        return 'Đã hủy';
      case 0:
        return 'Chờ chỉnh lý';
      case 1:
        return 'Đã chỉnh lý';
      default:
        return 'Chờ hủy';
    }
  }
}
