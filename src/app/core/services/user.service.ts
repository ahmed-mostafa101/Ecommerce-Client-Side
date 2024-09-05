import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../shared/models/constants';
import { User } from '../../shared/models/user.model';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private userSubject = new BehaviorSubject<User | null>(null);
  userObs$ = this.userSubject.asObservable();
  private subscriptions = new Subscription();

  constructor( private http: HttpClient) { }

  getUserProfile(accessToken: string) {
      const headers = new HttpHeaders({
        'auth-token': accessToken
      });

      this.subscriptions.add(
        this.http.get<{ user: User}>(`${BASE_URL}/user/profile`, { headers }).subscribe({
          next: (data) => {
            this.userSubject.next(data.user);
          },
          error: (error) => {
            console.log(error.error.message);
          }
        })
      );
    }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
