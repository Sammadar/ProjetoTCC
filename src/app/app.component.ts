import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projeto-tcc';


  constructor(private router: Router) { }

  redirecionarCadastro() {
    // carregando/navegando para a rota /cadastro
    this.router.navigate(["/cadastro"])
  }

  redirecionarHome() {
    this.router.navigate(["/"])
  }
}