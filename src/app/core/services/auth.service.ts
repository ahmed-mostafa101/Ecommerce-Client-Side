import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { BASE_URL } from '../../shared/models/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }
  register(user: User) {
    return this.http.post<{ message: string }>(`${BASE_URL}/user/register`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password });
  }

  login(user: User) {
    return this.http.post<{ accessToken: string }>(`${BASE_URL}/user/login`, {
      email: user.email, password: user.password });
  }

  resetPasswordRequest(email: string) {
    return this.http.post<{ resetToken: string }>(`${BASE_URL}/user/reset-password-request`, { email });
  }

  resetPassword(resetToken: string, newPassword: string) {

  }
}
