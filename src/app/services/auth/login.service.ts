import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// URL
const LOGIN_URL = 'http://localhost:8080/v1/api/auth/login';

// HttpHeader
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // CONSTRUCTOR
  constructor(private http: HttpClient) { }

  // *** METHODS ***
  // ***************
}
