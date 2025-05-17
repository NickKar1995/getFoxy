import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageObject } from '../../models/MessageObject';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastrService = inject(ToastrService);

  createSuccessNotificationObj(title: string, message: string): MessageObject {
    return {
      title,
      message,
    };
  }

  success(messageObject: MessageObject) {
    const { title, message } = messageObject;
    this.toastrService.success(title, message, { timeOut: 4000 });
  }

  error(messageObject: MessageObject) {
    const { title, message } = messageObject;
    this.toastrService.error(title, message, { timeOut: 4000 });
  }
}
