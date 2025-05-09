import { Injectable } from '@angular/core';
import { Toast } from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showSuccess(message: string): void {
    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-white bg-warning';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.style.position = 'fixed';
    toastEl.style.top = '100px';
    toastEl.style.left = '50%';
    toastEl.style.transform = 'translateX(-50%)';
    toastEl.style.zIndex = '1100';
    toastEl.style.minWidth = '300px';


    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    const toastContainer = document.getElementById('toast-container') || document.body;
    toastContainer.appendChild(toastEl);

    const toast = new Toast(toastEl, {
      autohide: true,
      delay: 5000
    });
    toast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  }
}
