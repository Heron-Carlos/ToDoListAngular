import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="toast"
      class="toast"
      [ngClass]="{
        'success': toast.type === 'success',
        'error': toast.type === 'error',
        'warning': toast.type === 'warning'
      }"
    >
      {{ toast.message }}
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #4caf50;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      animation: fadein 0.3s, fadeout 0.3s 2.7s;
      z-index: 9999;
    }

    .toast.warning {
      background-color: #ffc107;
      color: black;
    }

    .toast.error {
      background-color: #f44336;
    }

    @keyframes fadein {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeout {
      from { opacity: 1; transform: translateY(0); }
      to   { opacity: 0; transform: translateY(10px); }
    }
  `]
})
export class ToastComponent {
  toast: ToastMessage | null = null;
  timeoutRef: any;

  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe(msg => {
      this.toast = msg;

      // Limpa qualquer timeout anterior
      if (this.timeoutRef) clearTimeout(this.timeoutRef);

      // Some depois de 3 segundos
      this.timeoutRef = setTimeout(() => {
        this.toast = null;
      }, 3000);
    });
  }
}
