import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageObject } from '../../models/MessageObject';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastrService = inject(ToastrService);

  createSuccessNotificationObj(): MessageObject {
    const messageObject = {
      title: 'Success',
      message: 'Expense added successfully!',
    };
    return messageObject;
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
