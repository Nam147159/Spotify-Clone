import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { AutoFocusModule } from 'primeng/autofocus';
import { ImageModule } from 'primeng/image';
import { MenubarModule } from 'primeng/menubar';
import { ScrollPanelModule } from 'primeng/scrollpanel';


@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    InputTextModule,
    DataViewModule,
    ListboxModule,
    ButtonModule,
    CommonModule,
    OverlayPanelModule,
    ToastModule,
    FormsModule,
    SelectButtonModule,
    DropdownModule,
    InputGroupModule,
    AutoFocusModule,
    ImageModule,
    MenubarModule,
    ScrollPanelModule,
  ],
  providers: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent {
  playlists!: any[];
  isInputVisible = false;
  searchTerm = '';
  height = '500px'

  sortOptions = [
    { label: 'Recents', value: 'recents' },
    { label: 'Recently Added', value: 'recentlyAdded' },
    { label: 'Alphabetical', value: 'alphabetical' },
    { label: 'Creator', value: 'creator' },
  ];
  selectedSortOption = this.sortOptions[1];

  viewOptions: Array<{
    label: string;
    value: 'list' | 'grid' | 'compact';
    icon: string;
  }> = [
    { label: 'Compact', value: 'compact', icon: 'pi pi-bars' },
    { label: 'List', value: 'list', icon: 'pi pi-list' },
    { label: 'Grid', value: 'grid', icon: 'pi pi-th-large' },
  ];

  selectedViewOption = this.viewOptions[1];
  dv = { layout: this.selectedViewOption.value };

  constructor() {}

  ngOnInit() {
    this.playlists = [
      {
        id: 1,
        title: 'Chill Vibes',
        cover: 'https://via.placeholder.com/150',
        description: 'Relax and unwind',
        creator: 'NTT',
        addedDate: new Date('2023-11-26'),
        lastModifiedDate: new Date('2023-11-26'),
      },
      {
        id: 2,
        title: 'Workout Beats',
        cover: 'https://via.placeholder.com/150',
        description: 'Get pumped up!',
        creator: 'NTT',
        addedDate: new Date('2023-11-24'),
        lastModifiedDate: new Date('2023-11-28'),
      },
      {
        id: 3,
        title: 'Focus Time',
        cover: 'https://via.placeholder.com/150',
        description: 'Stay productive',
        creator: 'NTT',
        addedDate: new Date('2023-11-24'),
        lastModifiedDate: new Date('2023-11-28'),
      },
      {
        id: 4,
        title: 'Party Hits',
        cover: 'https://via.placeholder.com/150',
        description: "Let's dance!",
        creator: 'NTT',
        addedDate: new Date('2023-11-25'),
        lastModifiedDate: new Date('2023-11-27'),
      },
      {
        id: 1,
        title: 'Chill Vibes',
        cover: 'https://via.placeholder.com/150',
        description: 'Relax and unwind',
        creator: 'NTT',
        addedDate: new Date('2023-11-26'),
        lastModifiedDate: new Date('2023-11-26'),
      },
      {
        id: 2,
        title: 'Workout Beats',
        cover: 'https://via.placeholder.com/150',
        description: 'Get pumped up!',
        creator: 'NTT',
        addedDate: new Date('2023-11-24'),
        lastModifiedDate: new Date('2023-11-28'),
      },
      {
        id: 3,
        title: 'Focus Time',
        cover: 'https://via.placeholder.com/150',
        description: 'Stay productive',
        creator: 'NTT',
        addedDate: new Date('2023-11-24'),
        lastModifiedDate: new Date('2023-11-28'),
      },
      {
        id: 4,
        title: 'Party Hits',
        cover: 'https://via.placeholder.com/150',
        description: "Let's dance!",
        creator: 'NTT',
        addedDate: new Date('2023-11-25'),
        lastModifiedDate: new Date('2023-11-27'),
      },
    ];

    // this.testService.getPopularAlbums().subscribe((data: any[]) => {
    //     this.products = data;
    //     console.log(this.products);
    // });
  }

  changeView(event: any) {
    console.log(event.value.value);
    this.dv.layout = event.value.value;
  }

  showInput() {
    this.isInputVisible = true;
  }

  hideInput() {
    this.isInputVisible = false;
  }

  performSearch() {
    console.log('Searching for:', this.searchTerm);
  }

  sortItems() {
    switch (this.selectedSortOption.value) {
      case 'recents': {
        this.playlists.sort((a, b) => b.lastModifiedDate.getTime() - a.lastModifiedDate.getTime());
        break;
      }
      case 'recentlyAdded': {
        this.playlists.sort((a, b) => b.addedDate.getTime() - a.addedDate.getTime());
        break;
      }
      case 'alphabetical': {
        this.playlists.sort((a, b) => a.title.localeCompare(b.title));
        break;
      }
      case 'creator': {
        this.playlists.sort((a, b) => a.creator.localeCompare(b.creator));
        break;
      }
      default: {
        console.log(this.selectedSortOption.value);
        break;
      }
    }
  }
  
}
