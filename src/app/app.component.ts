import { Component, inject, OnInit } from '@angular/core'
import { SupabaseService } from './services/supabase/supabase.service'
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    SpinnerComponent
  ]
})
export class AppComponent implements OnInit {

  session: any;

  private _supabaseService = inject(SupabaseService);
  
  constructor(
  ) {

  }

  async ngOnInit() {
    await this._supabaseService.getSession().then((session) => {
      this.session = session;
    });
    
    this._supabaseService.authChanges((_, session) => (this.session = session));
  }
}