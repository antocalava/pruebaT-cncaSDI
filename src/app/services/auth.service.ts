import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: any = null;
  private userEmailSubject = new BehaviorSubject<string | null>(null);

  constructor(private router: Router) {}

  login(email: string, city: string) {
    const isAdmin = email.endsWith('@sdi.es');
    let role = 'user';

    if (isAdmin) {
      role = city === 'Madrid' ? 'admin1' : 'admin2';
    }

    this.userData = { email, city, role };
    localStorage.setItem('user', JSON.stringify(this.userData));
    this.router.navigate(['/dashboard']);
  }

  setUserEmail(email: string) {
    this.userEmailSubject.next(email);
  }

  getUserEmail(): Observable<string | null> {
    return this.userEmailSubject.asObservable();
  }

  logout() {
    this.userData = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  getRole(): string {
    return this.getUser()?.role || 'user';
  }
}
