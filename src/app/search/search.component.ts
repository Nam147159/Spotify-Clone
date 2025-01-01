import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search-service/search.service';
import {
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { AlbumCardComponent } from '../shared/album-card/album-card.component';
import { Album, Artist, Playlist } from '../models/spotify.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AlbumCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  albums: Album[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly searchService: SearchService,
  ) {}
  @ViewChild('mainDiv') mainDiv!: ElementRef;
  popularArtists: Artist[] = [];
  popularAlbums: Album[] = [];
  recommendedPlaylists: Playlist[] = [];
  top100Playlists: Playlist[] = [];

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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const query = params['query'];
      this.searchService.search(query).subscribe((result: any) => {
        this.albums = result.data;
        console.log(result);
      });
    });
  }
}
