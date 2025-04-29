import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageObject } from '../../models/MessageObject';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastrService = inject(ToastrService);

  createSuccessNotificationObj(isDeleteMessage = false, isEditMessage = false): MessageObject {
    let message = 'Expense added successfully!';

    if (isDeleteMessage) {
      message = 'Expense deleted successfully!';
    } else if (isEditMessage) {
      message = 'Expense edited successfully!';
    }

    return {
      title: 'Success',
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
