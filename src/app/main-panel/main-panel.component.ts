import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from '../shared/album-card/album-card.component';
import { ArtistCardComponent } from '../shared/artist-card/artist-card.component';
import {PlaylistCardComponent} from '../shared/playlist-card/playlist-card.component';
import { CategoryCardComponent } from '../shared/category-card/category-card.component';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MainPanelService } from '../../services/main-panel-service/main-panel.service';
import { response } from 'express';
import { error } from 'console';
import { Album, Artist, Category, Playlist } from '../models/spotify.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [CommonModule, AlbumCardComponent, ArtistCardComponent, PlaylistCardComponent, CategoryCardComponent, ScrollerModule, ScrollPanelModule],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.scss'
})
export class MainPanelComponent implements OnInit, AfterViewInit {
  @ViewChild('mainDiv') mainDiv!: ElementRef;
  searchValue: string | null = '';
  popularArtists: Artist[] = [];
  popularAlbums: Album[] = [];
  recommendedPlaylists: Playlist[] = [];
  top100Playlists: Playlist[] = [];
  categories: Category[] =  [
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFC7do0jUgBzi",
      "icons": [
        {
          "url": "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFC7do0jUgBzi",
      "name": "2024 in Music"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAt0tbjZptfcdMSKl3",
      "icons": [
        {
          "url": "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAt0tbjZptfcdMSKl3",
      "name": "Made For You"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFz6FAsUtgAab",
      "icons": [
        {
          "url": "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFz6FAsUtgAab",
      "name": "New Releases"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLIOWOrpNSUR",
      "icons": [
        {
          "url": "https://t.scdn.co/images/6e1202d14b1f400592532c10d10871ef.jpeg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFLIOWOrpNSUR",
      "name": "Vietnamese Music"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFEC4WFtoNRpw",
      "icons": [
        {
          "url": "https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFEC4WFtoNRpw",
      "name": "Pop"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFGvOw3O4nLAf",
      "icons": [
        {
          "url": "https://t.scdn.co/images/2078afd91e4d431eb19efc5bee5ab131.jpeg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFGvOw3O4nLAf",
      "name": "K-pop"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym",
      "icons": [
        {
          "url": "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFQ00XGBls6ym",
      "name": "Hip-Hop"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAudkNjCgYMM0TZXDw",
      "icons": [
        {
          "url": "https://charts-images.scdn.co/spotify-charts-logos/music_charts_search_arrow_274x274.jpeg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAudkNjCgYMM0TZXDw",
      "name": "Charts"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFImHYGo3eTSg",
      "icons": [
        {
          "url": "https://t.scdn.co/images/16e40e64d2a74fa8a0a020d456e6541d.jpeg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFImHYGo3eTSg",
      "name": "Fresh Finds"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFPw634sFwguI",
      "icons": [
        {
          "url": "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFPw634sFwguI",
      "name": "EQUAL"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFGnsSfvg90Wo",
      "icons": [
        {
          "url": "https://t.scdn.co/images/c5495b9f0f694ffcb39c9217d4ed4375",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFGnsSfvg90Wo",
      "name": "GLOW"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFOOxftoKZxod",
      "icons": [
        {
          "url": "https://i.scdn.co/image/ab67fb8200005cafed2d384c6d8708dc5394fc68",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFOOxftoKZxod",
      "name": "RADAR"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAtOnAEpjOgUKwXyxj",
      "icons": [
        {
          "url": "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAtOnAEpjOgUKwXyxj",
      "name": "Discover"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFNwFFRSG0HRv",
      "icons": [
        {
          "url": "https://t.scdn.co/media/categories/karaoke_274x274.jpg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFNwFFRSG0HRv",
      "name": "Karaoke"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFzHmL4tf05da",
      "icons": [
        {
          "url": "https://t.scdn.co/media/original/mood-274x274_976986a31ac8c49794cbdc7246fd5ad7_274x274.jpg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFzHmL4tf05da",
      "name": "Mood"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFDXXwE9BDJAr",
      "icons": [
        {
          "url": "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFDXXwE9BDJAr",
      "name": "Rock"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFxXaXKP7zcDp",
      "icons": [
        {
          "url": "https://t.scdn.co/media/derived/latin-274x274_befbbd1fbb8e045491576e317cb16cdf_0_0_274_274.jpg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFxXaXKP7zcDp",
      "name": "Latin"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF",
      "icons": [
        {
          "url": "https://t.scdn.co/media/derived/edm-274x274_0ef612604200a9c14995432994455a6d_0_0_274_274.jpg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFHOzuVTgTizF",
      "name": "Dance/Electronic"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCWjUTdzaG0e",
      "icons": [
        {
          "url": "https://t.scdn.co/images/fe06caf056474bc58862591cd60b57fc.jpeg",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFCWjUTdzaG0e",
      "name": "Indie"
    },
    {
      "href": "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFAXlCG6QvYQ4",
      "icons": [
        {
          "url": "https://t.scdn.co/media/links/workout-274x274.png",
          "height": 274,
          "width": 274
        }
      ],
      "id": "0JQ5DAqbMKFAXlCG6QvYQ4",
      "name": "Workout"
    }
  ];

  constructor(private mainPanelService: MainPanelService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPopularArtists();
    this.fetchPopularAlbums();
    this.fetchRecommendedPlaylists();
    this.fetchTop100Playlists();
  }

  ngAfterViewInit(): void {
    // this.calculateDisplayedItems();
    // this.widthPerCard();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.calculateDisplayedItems();
    this.widthPerCard();  
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

  fetchPopularArtists(): void {
    this.mainPanelService.getPopularArtists().subscribe({
      next: (response: { success: boolean; message: string; data: Artist[] }) => {
        if (response.success && Array.isArray(response.data)) {
          this.popularArtists = response.data;

          this.popularArtists = this.popularArtists.filter(artist => artist.name && artist.type && artist.images && artist.images.length > 0);
        } else {
          console.error('Invalid data structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching popular artists:', error);
      },
      complete: () => {
        console.log('Popular artists fetch complete');
      }
    });
  }

  fetchPopularAlbums(): void {
    this.mainPanelService.getPopularAlbums().subscribe({
      next: (response: { success: boolean; message: string; data: Album[] }) => {
        if (response.success && Array.isArray(response.data)) {
          this.popularAlbums = response.data;

          this.popularAlbums = this.popularAlbums.filter(album => album && album.name && album.artists && album.images && album.images.length > 0);
        } else {
          console.error('Invalid data structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching popular albums:', error);
      },
      complete: () => {
        console.log('Popular albums fetch complete');
      }
    });
  }

  fetchRecommendedPlaylists(): void {
    this.mainPanelService.getRecommendedPlaylists().subscribe({
      next: (response: { success: boolean; message: string; data: Playlist[] }) => {
        if (response.success && Array.isArray(response.data)) {
          this.recommendedPlaylists = response.data;

            //Filter data that has name, description, and images
            this.recommendedPlaylists = this.recommendedPlaylists.filter(playlist => playlist && playlist.name && playlist.description && playlist.images && playlist.images.length > 0);
        } else {
          console.error('Invalid data structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching recommend playlists:', error);
      },
      complete: () => {
        console.log('Top recommend fetch complete');
      }
    });
  }

  fetchTop100Playlists(): void {
    this.mainPanelService.getTop100Playlists().subscribe({
      next: (response: { success: boolean; message: string; data: Playlist[] }) => {
        if (response.success && Array.isArray(response.data)) {
          this.top100Playlists = response.data;

          //Filter data that has name, description, and images
          this.top100Playlists = this.top100Playlists.filter(playlist => playlist && playlist.name && playlist.description && playlist.images && playlist.images.length > 0 );
        } else {
          console.error('Invalid data structure:', response);
        }
      },
      error: (error) => {
        console.error('Error fetching top 100 playlists:', error);
      },
      complete: () => {
        console.log('Top 100 playlists fetch complete');
      }
    });
  }
}
