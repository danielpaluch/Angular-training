import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


const MaterialComponents = [
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
]

@NgModule({
    exports: [MaterialComponents],
    imports: [MaterialComponents]
})
export class MaterialModule { }