import { Injectable } from "@angular/core";

type params = {
  name: string;
  data: string;
};

@Injectable({
  providedIn: "root"
})
export class StorageProviderService {
  constructor() {}

  public seedToLocalStorage({ name, data }: params): void {
    localStorage.setItem(name, data);
  }

  public getItemFromStorage(dataName: string): string {
    return localStorage.getItem(dataName);
  }

  public removeItemFromStorage(dataName): void {
    localStorage.removeItem(dataName);
  }
}
