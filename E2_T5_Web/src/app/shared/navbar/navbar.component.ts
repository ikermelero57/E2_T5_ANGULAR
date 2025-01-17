import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    userRole: number | null = null; // Variable para almacenar el tipo de usuario

    constructor(public location: Location, private element: ElementRef) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

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
