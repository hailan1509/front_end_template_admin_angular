import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
  name : 'miningFileStatus'
})
export class MiningFileStatusPipe implements PipeTransform {
  transform(val: number): string {
    switch (val) {
      case 0:
        return 'Đang chờ duyệt';
      case 1:
        return 'Đã duyệt';
      case 2:
        return 'Từ chối';
      default:
        return 'Yêu cầu mượn';
    }
  }
}
