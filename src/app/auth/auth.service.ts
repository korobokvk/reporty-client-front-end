import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SIGN_IN_URL, SIGN_UP_URL } from "../../config";
import { Credentials } from "./interfaces/userCredentials";
import { Observable, pipe } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { StorageProviderService } from "../shared/services/storage-provider.service";
import { TOKEN_NAME } from "../shared/constants/name-spaces";

@Injectable()
export class AuthService {
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
}
