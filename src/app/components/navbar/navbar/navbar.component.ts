import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  imports: [Menubar, ButtonModule],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem [];

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Menu',
        icon: 'pi-pi-home'
      },
      {
        label: 'Brigadeiros'
      },
      {
        label: 'Pão de mel'
      },
      {
        label: 'Bolacha'
      },
      {
        label: 'Bolos'
      },
      {
        label: 'Doces gourmet'
      },
      {
        label: 'Combos'
      },
      {
        label: 'Cadastro',
        command: () =>this.navegar("/cadastro")
      }
    ]
  }

  private navegar(caminho: string){
    this.router.navigate([caminho]);
  }

}
