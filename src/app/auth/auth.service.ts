import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SIGN_IN_URL } from "../../config";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  public signIn(credentials) {
    this.http
      .post(SIGN_IN_URL, credentials)
      .subscribe(data => console.log(data));
  }
}
