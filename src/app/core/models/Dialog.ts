import { Type } from '@angular/core';

export type DialogConfig<BodyComponent, TData> = {
  component: Type<BodyComponent>;
  data?: TData;
  title?: string;
  panelClass?: string;
};
