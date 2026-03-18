import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth/auth';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.pattern('.*\\S+.*')]],
    apellidos: ['', [Validators.required, Validators.pattern('.*\\S+.*')]],
    nickname: ['', [Validators.required, Validators.pattern('.*\\S+.*')]],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$')]],
    password: ['', [Validators.required, Validators.pattern('.*\\S+.*'), Validators.minLength(4)]]
  });

  constructor() {
    // Si la autenticacion despues del registro es exitosa o el usuario cambia, nos vamos al menú
    toObservable(this.authService.isLoggedIn).subscribe(loggedIn => {
        if(loggedIn) {
            this.router.navigate(['/menu-principal']);
        }
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.getRawValue();
      const payload = {
          name: formValue.name,
          apellidos: formValue.apellidos,
          nickname: formValue.nickname,
          email: formValue.email,
          password: formValue.password
      };
      this.authService.register(payload);
    }
  }
}
