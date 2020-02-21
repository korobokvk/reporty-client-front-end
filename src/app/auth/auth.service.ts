import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SIGN_IN_URL, SIGN_UP_URL } from "../../config";
import { Credentials } from "./interfaces/userCredentials";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  public signIn(credentials: Credentials): Observable<{ [key: string]: any }> {
    return this.http.post(SIGN_IN_URL, credentials);
  }

  public signUp(credentials: Credentials): Observable<Object> {
    return this.http.post(SIGN_UP_URL, credentials);
  }
}
