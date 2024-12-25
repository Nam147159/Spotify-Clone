import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Music {
  id: number;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
  genre: string;
  dateAdded?: Date;
}
interface Playlist {
  id: number;
  title: string;
  cover?: string;
  description?: string;
  creator: string;
  musicList?: Music[];
  lastModifiedDate?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlists: Playlist[] = [
    {
      id: 1,
      title: 'My Playlist #1',
      cover: 'https://via.placeholder.com/150',
      description: 'Playlist',
      creator: 'NTT',
      musicList: [
        {
          id: 1,
          title: 'Music #1',
          artist: 'Artist #1',
          album: 'Album #1',
          cover: 'https://via.placeholder.com/150',
          duration: 300,
          genre: 'Pop',
          dateAdded: new Date(),
        },
        {
          id: 2,
          title: 'Music #2',
          artist: 'Artist #2',
          album: 'Album #2',
          cover: 'https://via.placeholder.com/150',
          duration: 300,
          genre: 'Pop',
          dateAdded: new Date(),
        },
        {
          id: 3,
          title: 'Music #3',
          artist: 'Artist #3',
          album: 'Album #3',
          cover: 'https://via.placeholder.com/150',
          duration: 300,
          genre: 'Pop',
          dateAdded: new Date(),
        },
      ],
    },
    {
      id: 2,
      title: 'My Playlist #2',
      cover: 'https://via.placeholder.com/150',
      description: 'Playlist',
      creator: 'NTT',
      musicList: [
        {
          id: 1,
          title: 'Music #1',
          artist: 'Artist #1',
          album: 'Album #1',
          cover: 'https://via.placeholder.com/150',
          duration: 300,
          genre: 'Pop',
        },
        {
          id: 2,
          title: 'Music #2',
          artist: 'Artist #2',
          album: 'Album #2',
          cover: 'https://via.placeholder.com/150',
          duration: 300,
          genre: 'Pop',
        },
        {
          id: 3,
          title: 'Music #3',
          artist: 'Artist #3',
          album: 'Album #3',
          cover: 'https://via.placeholder.com/150',
          duration: 300,
          genre: 'Pop',
        },
      ],
    },
    {
      id: 3,
      title: 'My Playlist #3',
      cover: 'https://via.placeholder.com/150',
      description: 'Playlist',
      creator: 'NTT',
    },
  ];
  private nextId: number = 1;

  constructor() {}

  getPlaylists(): Observable<Playlist[]> {
    return new Observable((observer) => {
      observer.next(this.playlists);
      observer.complete();
    });
  }

  retrivePlaylist(id: number): Observable<Playlist> {
    return new Observable((observer) => {
      const playlist = this.playlists.find((playlist) => playlist.id === id);
      if (playlist) {
        observer.next(playlist);
      } else {
        observer.error('Playlist not found');
      }
      observer.complete();
    });
  }

  createPlaylist(data: Omit<Playlist, 'id'>) {
    const newPlaylist = {
      id: this.nextId++,
      ...data,
      addedDate: new Date(),
      lastModifiedDate: new Date(),
    };
    this.playlists.push(newPlaylist);
    return newPlaylist;
  }

  updatePlaylist(id: number, p0: { title: any; cover: any; description: any; creator: any; }): Observable<Playlist> {
    return new Observable((observer) => {
      const index = this.playlists.findIndex((playlist) => playlist.id === id);
      if (index !== -1) {
        this.playlists[index] = {
          ...this.playlists[index],
          lastModifiedDate: new Date(),
        };
        observer.next(this.playlists[index]);
      } else {
        observer.error('Playlist not found');
      }
      observer.complete();
    });
  }    

  // addPlaylist(
  //   title: string,
  //   cover: string,
  //   description: string,
  //   creator: string
  // ) {
  //   const newPlaylist = {
  //     id: this.nextId++,
  //     title,
  //     cover,
  //     description,
  //     creator,
  //     addedDate: new Date(),
  //     lastModifiedDate: new Date(),
  //   };
  //   this.playlists.push(newPlaylist);
  //   return newPlaylist;
  // }

  deletePlaylist(id: number) {
    this.playlists = this.playlists.filter((playlist) => playlist.id !== id);
  }
}
