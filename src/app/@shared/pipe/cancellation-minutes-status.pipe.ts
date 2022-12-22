import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
  name : 'cancellationMinutesStatus'
})
export class CancellationMinutesStatusPipe implements PipeTransform {
  transform(val: number): string {
    switch (val) {
      case 0:
        return 'Đang chờ duyệt';
      case 1:
        return 'Đã duyệt';
      default:
        return 'Từ chối';
    }
  }
}
