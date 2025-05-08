import { Injectable, computed, effect, inject, signal } from "@angular/core";

export interface AppTheme {
    name: string;
    icon: string;
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    appTheme = signal<'light' | 'dark'|'system'>('system');

    ThemeList: AppTheme[] = [
        { name: 'Light', icon: 'wb_sunny' },
        { name: 'Dark', icon: 'nights_stay' },
        { name: 'System', icon: 'computer' },
    ];

    getThemes() {
        return this.ThemeList;
    }

    setTheme(name: 'light' | 'dark' | 'system') {
        this.appTheme.set(name);
    }
}