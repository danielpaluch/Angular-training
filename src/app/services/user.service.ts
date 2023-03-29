import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { Album } from '../model/album';
import { Photo } from '../model/photo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'https://jsonplaceholder.typicode.com/users';
  private albumUrl: string = 'https://jsonplaceholder.typicode.com/album'
  private shownPhotos = new BehaviorSubject<Array<string>>([]);

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${userId}`);
  }
  getUserAlbums(userId: number): Observable<Album> {
    return this.http.get<Album>(`${this.url}/${userId}/albums`);
  }
  getPhotosFromAlbums(albumId: number, start: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.albumUrl}/${albumId}/photos?_start=${start}&_limit=4`);
  }

  getShownPhotos(): Observable<Array<string>> {
    return this.shownPhotos.asObservable();
  }

  deletePhoto(urlOfPhoto: string) {
    const newShownPhotos = this.shownPhotos.getValue();
    const result = newShownPhotos.filter(element => element != urlOfPhoto);
    this.shownPhotos.next(result);
  }

  putPhoto(urlOfPhoto: string) {
    const newShownPhotos = this.shownPhotos.getValue();
    newShownPhotos.push(urlOfPhoto);
    this.shownPhotos.next(newShownPhotos);
  }

}
