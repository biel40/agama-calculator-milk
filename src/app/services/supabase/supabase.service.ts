import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  private supabase: SupabaseClient;
  public _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async getSession() {
    if (!this._session) {
      const { data } = await this.supabase.auth.getSession();
      this._session = data.session;
    }
    return this._session;
  }

  public async profile(user: User) : Promise<any> {
    try {
      let query = await this.supabase.from('profile').select('*').eq('user_id', user.id).single();

      let dataProfile = query.data;

      return dataProfile;
    } catch(error) {
      console.error(error);
    }
  }

  async getAllHabilities() {
    let { data: habilities, error } = await this.supabase
      .from('habilities')
      .select('*');

    return error ? error : habilities;
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({
      email: email,
      password: password,
    });
  }
}