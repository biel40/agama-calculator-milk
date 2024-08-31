import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { SupabaseService } from '../../services/supabase/supabase.service';

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
        private _supabaseService: SupabaseService
    ) { 

    }

    public ngOnInit(): void {
       this._loadData();
    }

    private async _loadData(): Promise<void>{
        // We load the data of the profile of the user that is currently logged in
        try {
            const session = await this._supabaseService.getSession();

            if (session) {
                this.profile = await this._supabaseService.profile(session.user);

                console.log('Profile: ', this.profile);
            }
        } catch(error) {
            console.error(error);
        }
    }

    public async signOut(): Promise<void> {
        try {
            await this._supabaseService.signOut();
        } catch(error) {
            console.error(error);
        }
    }

}