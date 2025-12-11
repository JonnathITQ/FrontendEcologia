import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-captcha',
  imports: [FormsModule, CommonModule],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css'
})
export class CaptchaComponent {
  @Output() onSuccess = new EventEmitter<void>();

  public captchaText: string = '';
  public userInput: string = '';
  public isError: boolean = false;
  Math = Math;

  constructor() {
    this.generateCaptcha();
  }

  generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.captchaText = result;
    this.userInput = '';
    this.isError = false;
  }

  verifyCaptcha() {
    if (this.userInput === this.captchaText) {
      this.onSuccess.emit();
    } else {
      this.isError = true;
      this.generateCaptcha();
    }
  }
}
