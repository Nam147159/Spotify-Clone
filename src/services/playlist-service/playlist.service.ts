import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private playlists: {
    id: number;
    title: string;
    description: string;
    creator: string;
  }[] = [];
  private nextId: number = 1;

  constructor() {}

  getPlaylists() {
    return [...this.playlists];
  }

  addPlaylist(
    title: string,
    cover: string,
    description: string,
    creator: string
  ) {
    const newPlaylist = {
      id: this.nextId++,
      title,
      cover,
      description,
      creator,
      addedDate: new Date(),
      lastModifiedDate: new Date(),
    };
    this.playlists.push(newPlaylist);
    return newPlaylist;
  }

  deletePlaylist(id: number) {
    this.playlists = this.playlists.filter((playlist) => playlist.id !== id);
  }

  updatePlaylist(id: number, updatedData: any) {
    const index = this.playlists.findIndex((playlist) => playlist.id === id);
    if (index !== -1) {
      this.playlists[index] = {
        ...this.playlists[index],
        ...updatedData,
        lastModifiedDate: new Date(),
      };
    }
  }
}
