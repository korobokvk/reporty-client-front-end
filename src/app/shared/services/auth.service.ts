import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  SIGN_IN_URL,
  SIGN_UP_URL,
  CHECK_TOKEN_IF_VALID
} from "../../../config";
import { Credentials } from "../../auth/interfaces/userCredentials";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { StorageProviderService } from "./storage-provider.service";
import { TOKEN_NAME } from "../constants/name-spaces";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private authSubject: Subject<boolean> = new Subject();
  public authObserver = this.authSubject.asObservable();
  constructor(
    private http: HttpClient,
    private storage: StorageProviderService
  ) {}

  public signIn(credentials: Credentials): Observable<void> {
    return this.http.post(SIGN_IN_URL, credentials).pipe(
      map((token: { JWT: string }) => {
        const { JWT } = token;
        const storageData = {
          name: TOKEN_NAME,
          data: JWT
        };
        this.storage.seedToLocalStorage(storageData);
        this.authSubject.next(true);
      })
    );
  }

  public signUp(credentials: Credentials): Observable<void> {
    return this.http.post(SIGN_UP_URL, credentials).pipe(
      map((token: { JWT: string }) => {
        const { JWT } = token;
        const storageData = {
          name: TOKEN_NAME,
          data: JWT
        };
        this.storage.seedToLocalStorage(storageData);
      })
    );
  }

  public checkIfTokenValid() {
    return this.http
      .get(CHECK_TOKEN_IF_VALID)
      .pipe(map((data: boolean) => this.authSubject.next(data)));
  }

  public logOut() {
    this.storage.removeItemFromStorage(TOKEN_NAME);
    if (!this.storage.getItemFromStorage(TOKEN_NAME)) {
      this.authSubject.next(false);
    }
  }
}
