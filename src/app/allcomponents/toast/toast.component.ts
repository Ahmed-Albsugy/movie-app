import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() message: string = '';

  close() {
    const toastEl = document.querySelector('.toast');
    if (toastEl) {
      toastEl.classList.remove('show');
      setTimeout(() => {
        toastEl.remove();
      }, 300);
    }
  }
}
