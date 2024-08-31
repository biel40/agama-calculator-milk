import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [
        MaterialModule
    ],
    standalone: true,
})
export class DashboardComponent implements OnInit {

    // Usar modelos para definir el tipo de datos
    public profile: any;

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

}