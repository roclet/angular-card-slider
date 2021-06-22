import { NgModule } from '@angular/core';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
const modules = [
  // MatButtonModule,
  // MatFormFieldModule,
  // MatInputModule,
];
@NgModule({
  imports: [modules],
  exports: [modules],
})
export class MaterialModule {}
