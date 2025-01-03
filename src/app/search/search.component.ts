import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search-service/search.service';
import {
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { AlbumCardComponent } from '../shared/album-card/album-card.component';
import { Album, Artist, Playlist, Track } from '../models/spotify.model';
import { ArtistCardComponent } from '../shared/artist-card/artist-card.component';
import { PlaylistComponent } from '../playlist/playlist.component';
import { PlaylistCardComponent } from '../shared/playlist-card/playlist-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AlbumCardComponent, ArtistCardComponent, PlaylistCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  albums: Album[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  playlists: Playlist[] = [];


  constructor(
    private readonly route: ActivatedRoute,
    private readonly searchService: SearchService,
  ) {}

  @ViewChild('mainDiv') mainDiv!: ElementRef;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log("fuck");
      const query = params['query'];
      this.searchService.search(query).subscribe((result: any) => {
        console.log(result);
        this.albums = result.data?.albums?.items;
        this.tracks = result.data?.albums?.tracks;
        this.artists = result.data?.artists?.items;
        this.playlists = result.data.playlists.items;
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.calculateDisplayedItems();
    this.widthPerCard();
  }

  calculateDisplayedItems(): number {
    const divWidth = this.getMainWidth();
    let itemsToShow = 1;

    if (divWidth > 1200) {
      itemsToShow = 7;
    } else if (divWidth > 992) {
      itemsToShow = 5;
    } else if (divWidth > 768) {
      itemsToShow = 4;
    } else if (divWidth > 576) {
      itemsToShow = 3;
    } else if (divWidth > 400) {
      itemsToShow = 2;
    }
    return itemsToShow;
  }

  getMainWidth(): number {
    if (this.mainDiv && this.mainDiv.nativeElement) {
      const divWidth = this.mainDiv.nativeElement.offsetWidth;
      return divWidth;
    }
    return 1000;
  }

  widthPerCard(): string {
    const divWidth = this.getMainWidth();
    const itemsToShow = this.calculateDisplayedItems();
    const width = divWidth / itemsToShow;
    return width + 'px';
  }
}
