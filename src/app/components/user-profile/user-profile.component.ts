import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private location: Location) {
    this.userService.getShownPhotos().subscribe((newShownPhotos: Array<string>) => {
      this.shownPhotos = newShownPhotos;
    });
  }

  userId: any;
  albumId: any;
  user: any;
  user_initials = "";
  user_adress: any;
  albums: any;
  photos: any;
  shownPhotos: Array<string> = [];
  start = 0;

  // CHANGING LINKS
  changeLink() {
    this.location.replaceState(`user/${this.userId}/album/${this.albumId}`);
    this.userService.getPhotosFromAlbums(this.albumId, this.start).subscribe(photosOfAlbum => {
      this.photos = photosOfAlbum;
    })
  }
  // PAGINATION
  photosBack() {
    if (this.start - 4 >= 0) {
      this.start = this.start - 4;
      this.userService.getPhotosFromAlbums(this.albumId, this.start).subscribe(photosOfAlbum => {
        this.photos = photosOfAlbum;
      })
    }
  }
  photosForward() {
    this.start = this.start + 4;
    this.userService.getPhotosFromAlbums(this.albumId, this.start).subscribe(photosOfAlbum => {
      this.photos = photosOfAlbum;
    })
  }
  // PHOTOS ACTION
  showPhoto(value: string) {
    const alreadyPlaced = this.shownPhotos.filter(element => element == value);
    if (alreadyPlaced.length == 0) {
      this.userService.putPhoto(value);
    }
  }
  changeWidth($event: any) {
    console.log($event.target.src);
    if ($event.target.style.width == "40px") {
      this.userService.deletePhoto($event.target.src);
    } else {
      $event.target.style.width = "40px";
      $event.target.style.height = "40px";
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.userId = params['id'];
        this.albumId = params['albumId']
        if (this.userId < 0 || this.userId == undefined) { // USER WAS NOT FOUND
        this.router.navigateByUrl('/user');
        }
    });
    this.userService.getUserById(this.userId).subscribe(userProfile => {
      this.user = userProfile as User;
      const initialsArray = this.user.name.split(' ');
      initialsArray.forEach((word: string) => {
        this.user_initials = this.user_initials + word[0] + ".";
      })
      this.user_adress = userProfile.address;
      console.log(this.user);
    });
    this.userService.getUserAlbums(this.userId).subscribe(albumsOfUser => {
      this.albums = albumsOfUser
    })
  }
}

