import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  correo: string = '';
  clave: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin(): void {
    const credenciales = { correo: this.correo, password: this.clave };

    this.authService.login(credenciales).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        this.router.navigate(['mis-incidencias']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
        alert('Credenciales incorrectas o error en el servidor');
      },
    });
  }
}
