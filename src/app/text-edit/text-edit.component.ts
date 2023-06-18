import { Component } from '@angular/core';
import { editorConfig } from './../service/editor-config';

@Component({
  selector: 'app-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.scss'],
})

export class TextEditComponent {
  editorConfig = editorConfig;
}
