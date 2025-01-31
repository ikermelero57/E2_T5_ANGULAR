import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';  // Módulo correcto
import { MatListModule } from '@angular/material/list';  // Para las listas dentro del sidenav

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule, MatIconModule, MatSidenavModule, MatListModule], // Asegúrate de importar estos módulos
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  public sidebarVisible: boolean = false;
  userRole: number | null = null; // Variable para almacenar el tipo de usuario

  constructor(public location: Location) {
      this.sidebarVisible = false;
  }

  ngOnInit() {
      // Extraer datos del usuario desde localStorage
      const user = localStorage.getItem('user');
      if (user) {
          const userData = JSON.parse(user);
          this.userRole = userData.tipo_id; // Ajustar al campo correcto
      }
  }

  sidebarOpen() {
      const toggleButton = this.toggleButton;
      const html = document.getElementsByTagName('html')[0];
      setTimeout(function () {
          toggleButton.classList.add('toggled');
      }, 500);
      html.classList.add('nav-open');
      this.sidebarVisible = true;
  }

  sidebarClose() {
      const html = document.getElementsByTagName('html')[0];
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      html.classList.remove('nav-open');
  }

  sidebarToggle() {
      if (this.sidebarVisible === false) {
          this.sidebarOpen();
      } else {
          this.sidebarClose();
      }
  }

  // Comprobar si el usuario está autenticado
  userAuth(): boolean {
      return !!localStorage.getItem('user');
  }

  // Cerrar sesión
  logout() {
      localStorage.removeItem('user');
      //redireccionar a la página de sign up
      window.location.href = '/signup';
      //window.location.reload(); // Recargar la página para limpiar el estado
  }
}
