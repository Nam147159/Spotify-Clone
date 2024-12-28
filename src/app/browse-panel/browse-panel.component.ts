import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Category } from '../models/spotify.model';
import { CategoryCardComponent } from "../shared/category-card/category-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse-panel',
  standalone: true,
  imports: [CategoryCardComponent, CommonModule,],
  templateUrl: './browse-panel.component.html',
  styleUrl: './browse-panel.component.scss'
})
export class BrowsePanelComponent implements OnInit, AfterViewInit {
  
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

  constructor() {
  }
  ngAfterViewInit(): void {
   
  }
  ngOnInit(): void {
  }
}
