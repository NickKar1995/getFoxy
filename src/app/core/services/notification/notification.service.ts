import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageObject } from '../../models/MessageObject';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastrService = inject(ToastrService);

  createSuccessNotificationObj(isDeleteMessage = false): MessageObject {
    return {
      title: 'Success',
      message: isDeleteMessage ? 'Expense deleted successfully!' : 'Expense added successfully!',
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
