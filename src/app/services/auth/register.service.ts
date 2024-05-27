import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// URL
const REGISTER_URL = 'http://localhost:8080/v1/api/auth/register';

// HttpHeader
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // CONSTRUCTOR
  constructor(private http: HttpClient) { }

  // *** METHODS ***
  // ***************
  
}
