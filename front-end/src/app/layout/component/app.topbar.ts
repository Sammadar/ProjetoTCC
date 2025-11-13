import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Popover, PopoverModule } from 'primeng/popover';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        StyleClassModule,
        AppConfigurator,
        ButtonModule,
        TooltipModule,
        PopoverModule
    ],
    template: `
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <a class="layout-topbar-logo" routerLink="/">
                <span>CuraSystem</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>

                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
                pStyleClass="@next"
                enterFromClass="hidden"
                enterActiveClass="animate-scalein"
                leaveToClass="hidden"
                leaveActiveClass="animate-fadeout"
                [hideOnOutsideClick]="true"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">

                    <!-- PERFIL COM POPOVER -->
                    <button
                        type="button"
                        class="layout-topbar-action"
                        (click)="userPopover.toggle($event)"
                        pTooltip="Perfil"
                        tooltipPosition="bottom"
                    >
                        <i class="pi pi-user"></i>
                        <span>Perfil</span>
                    </button>

                    <!-- Popover de opções -->
                    <p-popover #userPopover>
                        <div class="user-menu">
                            <p-button
                                label="Configurações"
                                icon="pi pi-cog"
                                styleClass="p-button-text w-full"
                                routerLink="/configuracoes"
                            ></p-button>

                            <p-button
                                label="Sair"
                                icon="pi pi-sign-out"
                                styleClass="p-button-text p-button-danger w-full"
                                routerLink="/register"
                            ></p-button>
                        </div>
                    </p-popover>
                </div>
            </div>
        </div>
    </div>
    `,
    styles: [`
        .user-menu {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.3rem;
            min-width: 180px;
        }

        ::ng-deep .user-menu .p-button {
            justify-content: flex-start;
        }
    `]
})
export class AppTopbar {
    @ViewChild('userPopover') userPopover!: Popover;
    router: any;

    constructor(public layoutService: LayoutService) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }

    logout() {
        this.userPopover.hide();
        console.log('Saindo do sistema...');
        // localStorage.removeItem('token');
        // this.router.navigate(['/login']);
    }
}
