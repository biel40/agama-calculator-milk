import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalculatorComponent } from './components/calculator/calculator.component';

export const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'calculator', component: CalculatorComponent }
];
