import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject, observable } from "rxjs";
import { map, takeLast, take, catchError } from "rxjs/operators";
import {
  SIGN_IN_URL,
  SIGN_UP_URL,
  CHECK_TOKEN_IF_VALID,
} from "../../../config";
import { Credentials } from "../../auth/interfaces/userCredentials";
import { StorageProviderService } from "./storage-provider.service";
import { TOKEN_NAME } from "../constants/name-spaces";

type token = { JWT: string };
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authSubject: Subject<boolean> = new Subject();
  private token: token;
  public authObserver = () => this.authSubject.asObservable();
  //.pipe(takeLast(2));

  constructor(
    private http: HttpClient,
    private storage: StorageProviderService,
    private router: Router
  ) {}

  public signIn(credentials: Credentials): Observable<void> {
    return this.http.post(SIGN_IN_URL, credentials).pipe(
      map((token: token) => {
        this.token = token;
        this.setTokenToStorage();
      })
    );
  }

  public signUp(credentials: Credentials): Observable<void> {
    return this.http.post(SIGN_UP_URL, credentials).pipe(
      map((token: { JWT: string }) => {
        this.token = token;
        this.setTokenToStorage();
      })
    );
  }

  public checkIfTokenValid(): Observable<boolean> {
    return this.http.get(CHECK_TOKEN_IF_VALID).pipe(
      map((data: boolean) => {
        this.setAuthorized();
        return data;
      })
    );
  }

  public logOut(): void {
    this.redirectToAuth();
    this.setUnAuthorized();
  }

  public setUnAuthorized(): void {
    this.authSubject.next(false);
    this.removeTokenFromStorage();
  }

  public setAuthorized(): void {
    if (this.storage.getItemFromStorage(TOKEN_NAME)) {
      this.authSubject.next(true);
    } else {
      this.authSubject.next(false);
    }
  }

  private setTokenToStorage() {
    const { JWT } = this.token;
    const storageData = {
      name: TOKEN_NAME,
      data: JWT,
    };
    this.storage.seedToLocalStorage(storageData);
    this.setAuthorized();
  }

  private removeTokenFromStorage() {
    this.storage.removeItemFromStorage(TOKEN_NAME);
  }

  private redirectToAuth() {
    this.router.navigate(["auth"]);
  }
}
