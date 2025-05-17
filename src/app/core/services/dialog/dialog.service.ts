import { inject, Injectable } from '@angular/core';
import { DialogConfig } from '../../models/Dialog';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(MatDialog);

  open<Component, TypeOfData, ReturnedData>(config: DialogConfig<Component, TypeOfData>): Observable<ReturnedData | undefined> {
    const ref = this.dialog.open<Component, TypeOfData, ReturnedData>(config.component, {
      data: config.data,
      panelClass: config.panelClass,
    });
    return ref.afterClosed();
  }
}
