import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
    imports: [
        MaterialModule,
        FormsModule
    ],
    standalone: true,
})
export class CalculatorComponent implements OnInit {

    // Usar modelos para definir el tipo de datos
    public profile: any;

    public volume1: number = 0;
    public volume2: number = 0;
    public fat1: number = 0;
    public fat2: number = 0;

    public totalFatCalculated: number = 0;
    public totalVolumeCalculated: number = 0;

    constructor(
        private _supabaseService: SupabaseService,
        private _router: Router
    ) { 

    }

    public ngOnInit(): void {
       this._loadData();
    }

    private async _loadData(): Promise<void>{
        try {
            const session = await this._supabaseService.getSession();

            if (session) {
                this.profile = await this._supabaseService.profile(session.user);
            }
        } catch(error) {
            console.error(error);
        }
    }

    public async signOut(): Promise<void> {
        try {
            let response = await this._supabaseService.signOut();

            if (response) {
                this._router.navigate(['']);
            }
        } catch(error) {
            console.error(error);
        }
    }

    public calculate(): void {
        alert('Calculando...');

        // Primero calcularemos la Grasa Final. 
        // La grasa final se calcula .....

        // Una vez que tengamos la grasa final, calculamos el total del volumen del producto
        let totalVolume = this.volume1 + this.volume2;
        let totalFat = (this.volume1 * this.fat1 + this.volume2 * this.fat2) / totalVolume;

        // Aplicar bien los calculos
        this.totalFatCalculated = totalFat;
        this.totalVolumeCalculated = totalVolume;
    }

    public goBack(): void {
        this._router.navigate(['/dashboard']);
    }

}