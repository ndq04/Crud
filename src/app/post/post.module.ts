import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { PostRoutingModule } from './post-routing.module';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [IndexComponent, ViewComponent, CreateComponent, EditComponent],
  imports: [CommonModule, PostRoutingModule, FormsModule, ReactiveFormsModule],
})
export class PostModule {}
