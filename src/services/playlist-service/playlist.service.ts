import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

const createPlaylistEndpoint = `${environment.apiUrl}/api/spotify/create-playlist`;

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  
  // private dataSource = new BehaviorSubject<string>('bruh');
  // data$ = this.dataSource.asObservable();
  // private playlists = new BehaviorSubject<Playlist[]>([
  //   {
  //     id: 1,
  //     title: 'My Playlist #1',
  //     cover: 'https://via.placeholder.com/150',
  //     description: 'Playlist',
  //     creator: 'NTT',
  //     musicList: [
  //       {
  //         id: 1,
  //         title: 'Music #1.1',
  //         artist: 'Artist #1.1',
  //         album: 'Album #1.1',
  //         cover: 'https://via.placeholder.com/150',
  //         duration: 300,
  //         genre: 'Pop',
  //         dateAdded: new Date(),
  //       },
  //       {
  //         id: 2,
  //         title: 'Music #1.2',
  //         artist: 'Artist #1.2',
  //         album: 'Album #1.2',
  //         cover: 'https://via.placeholder.com/150',
  //         duration: 300,
  //         genre: 'Pop',
  //         dateAdded: new Date(),
  //       },
  //       {
  //         id: 3,
  //         title: 'Music #1.3',
  //         artist: 'Artist #1.3',
  //         album: 'Album #1.3',
  //         cover: 'https://via.placeholder.com/150',
  //         duration: 300,
  //         genre: 'Pop',
  //         dateAdded: new Date(),
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'My Playlist #2',
  //     cover: 'https://via.placeholder.com/150',
  //     description: 'Playlist',
  //     creator: 'NTT',
  //     musicList: [
  //       {
  //         id: 1,
  //         title: 'Music #2.1',
  //         artist: 'Artist #2.1',
  //         album: 'Album #2.1',
  //         cover: 'https://via.placeholder.com/150',
  //         duration: 300,
  //         genre: 'Pop',
  //         dateAdded: new Date(),
  //       },
  //       {
  //         id: 2,
  //         title: 'Music #2.2',
  //         artist: 'Artist #2.2',
  //         album: 'Album #2.2',
  //         cover: 'https://via.placeholder.com/150',
  //         duration: 300,
  //         genre: 'Pop',
  //         dateAdded: new Date(),
  //       },
  //       {
  //         id: 3,
  //         title: 'Music #2.3',
  //         artist: 'Artist #2.3',
  //         album: 'Album #2.3',
  //         cover: 'https://via.placeholder.com/150',
  //         duration: 300,
  //         genre: 'Pop',
  //         dateAdded: new Date(),
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: 'My Playlist #3',
  //     cover: 'https://via.placeholder.com/150',
  //     description: 'Playlist',
  //     creator: 'NTT',
  //     musicList: [
  //       {
  //         id: 1,
  //         title: 'Music #3.1',
  //         artist: 'Artist #3.1',
  //         album: 'Album #3.1',
  //         cover: 'https://via.placeholder.com/150',
  //         duration: 300,
  //         genre: 'Pop',
  //         dateAdded: new Date(),
  //       },
  //       {
  //         id: 2,
  //         title: 'Music #3.2',
  //         artist: 'Artist #3.2',
  //         album: 'Album #3.2',
  //         cover: 'https://via.placeholder.com/150',
  //         duration: 300,
  //         genre: 'Pop',
  //         dateAdded: new Date(),
  //       },
  //       {
  //         id: 3,
  //         title: 'Music #3.3',
  //         artist: 'Artist #3.3',
  //         album: 'Album #3.3',
  //         cover: 'https://via.placeholder.com/150',
  //         duration: 300,
  //         genre: 'Pop',
  //         dateAdded: new Date(),
  //       },
  //     ],
  //   },
  // ]);
  // public $playlists = this.playlists.asObservable();
  // private nextId: number = 1;

  constructor(private http: HttpClient) { }

  // getPlaylists(): Observable<Playlist[]> {
  //   return this.$playlists;
  // }

  // retrivePlaylist(id: number): Observable<Playlist> {
  //   return new Observable((observer) => {
  //     const playlist = this.playlists.value.find(
  //       (playlist) => playlist.id === id
  //     );
  //     if (playlist) {
  //       observer.next(playlist);
  //     } else {
  //       observer.error('Playlist not found');
  //     }
  //     observer.complete();
  //   });
  // }

  // createPlaylist(data: Omit<Playlist, 'id'>) {
  //   const newPlaylist = {
  //     id: this.nextId++,
  //     ...data,
  //     addedDate: new Date(),
  //     lastModifiedDate: new Date(),
  //   };
  //   this.playlists.next([...this.playlists.value, newPlaylist]);
  //   return newPlaylist;
  // }

  createNewPlaylist(name: string, description: string, isPublic: boolean): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { name, description, public: isPublic };
    return this.http.post(createPlaylistEndpoint, body, { headers });
  }
  // updatePlaylist(
  //   id: number,
  //   data: Partial<Omit<Playlist, 'id'>>
  // ): Observable<Playlist> {
  //   console.log('Updating playlist:', id, data); // Debug log

  //   // Truy cập danh sách playlist hiện tại
  //   const playlists = this.playlists.value;

  //   // Tìm index của playlist cần cập nhật
  //   const index = playlists.findIndex((playlist) => playlist.id === id);

  //   if (index !== -1) {
  //     // Cập nhật playlist với dữ liệu mới
  //     const updatedPlaylist = {
  //       ...playlists[index],
  //       ...data,
  //       lastModifiedDate: new Date(),
  //     };
  //     playlists[index] = updatedPlaylist;

  //     // Cập nhật lại BehaviorSubject với danh sách playlist mới
  //     this.playlists.next([...playlists]);

  //     // Trả về playlist đã được cập nhật
  //     return new Observable<Playlist>((observer) => {
  //       observer.next(updatedPlaylist);
  //       observer.complete();
  //     });
  //   } else {
  //     // Nếu không tìm thấy playlist theo id, trả về lỗi
  //     return new Observable<Playlist>((observer) => {
  //       observer.error('Playlist not found');
  //       observer.complete();
  //     });
  //   }
  // }

  // deletePlaylist(id: number) {
  //   this.playlists.next(
  //     this.playlists.value.filter((playlist) => playlist.id !== id)
  //   );
  //   console.log('playlists:', this.playlists.value);
  // }

  // updateDetailData(newData: string) {
  //   console.log('Updating detail data to:', newData); // Debug log
  //   this.dataSource.next(newData);
  // }
}
