import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
} from '@angular/core';
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
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PlaylistService } from '../../services/playlist-service/playlist.service';
import { Route, Router } from '@angular/router';

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
    ContextMenuModule,
    DialogModule,
    InputTextareaModule,
  ],
  providers: [PlaylistService],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnInit {
  @ViewChild('cmItem') cmItem!: ContextMenu;
  @ViewChild('cm') cm!: ContextMenu;
  @Output() playlistVisibilityChange = new EventEmitter<boolean>();

  playlists: any[] = [];
  filteredPlaylists: any[] = [];
  selectedPlaylist: any = {};
  selectedSortOption: any;
  selectedViewOption: any;
  dv!: { layout: any };
  isInputVisible = false;
  dialogVisible = false;
  searchTerm = '';
  height = '600px';

  sortOptions = [
    { label: 'Recents', value: 'recents' },
    { label: 'Recently Added', value: 'recentlyAdded' },
    { label: 'Alphabetical', value: 'alphabetical' },
    { label: 'Creator', value: 'creator' },
  ];

  viewOptions: Array<{
    label: string;
    value: 'list' | 'grid' | 'compact';
    icon: string;
  }> = [
    { label: 'Compact', value: 'compact', icon: 'pi pi-bars' },
    { label: 'List', value: 'list', icon: 'pi pi-list' },
    { label: 'Grid', value: 'grid', icon: 'pi pi-th-large' },
  ];

  contextMenu = [
    {
      label: 'Create playlist',
      icon: 'pi pi-file-plus',
      command: () => this.createPlaylist(),
    },
    {
      label: 'Create folder',
      icon: 'pi pi-folder-plus',
      // command: () => this.createFolder(),
    },
  ];

  contextMenuItems = [
    {
      label: 'Remove form profile',
      icon: 'pi pi-file-plus',
      // command: () => this.createPlaylist(),
    },
    {
      separator: true,
    },
    {
      label: 'Edit details',
      icon: 'pi pi-folder-plus',
      command: () => this.editPlaylist(this.selectedPlaylist),
    },
    {
      label: 'Delete',
      icon: 'pi pi-folder-plus',
      command: () => this.deletePlaylist(this.selectedPlaylist),
    },
    {
      separator: true,
    },
    {
      label: 'Create playlist',
      icon: 'pi pi-file-plus',
      command: () => this.createPlaylist(),
    },
    {
      label: 'Create folder',
      icon: 'pi pi-folder-plus',
      // command: () => this.createFolder(),
    },
    {
      label: 'Exclude form your taste profile',
      icon: 'pi pi-folder-plus',
      // command: () => this.createFolder(),
    },
    {
      label: 'Move to folder',
      icon: 'pi pi-folder-plus',
      items: [
        {
          label: 'Create folder',
          icon: 'pi pi-folder-plus',
          // command: () => this.createFolder(),
        },
      ],
    },
    {
      label: 'Pin playlist',
      icon: 'pi pi-folder-plus',
      // command: () => this.createFolder(),
    },
    {
      separator: true,
    },
    {
      label: 'Share',
      icon: 'pi pi-file-plus',
      items: [
        {
          label: 'Copy link to playlist',
          icon: 'pi pi-caret-right',
        },
        {
          label: 'Embed playlist',
          icon: 'pi pi-pause',
        },
      ],
    },
  ];

  constructor(
    private playlistService: PlaylistService,
    private route: Router,
  ) {}

  ngOnInit() {
    console.log('PlaylistComponent');
    this.selectedSortOption = this.sortOptions[1];
    this.selectedViewOption = this.viewOptions[1];
    this.dv = { layout: this.selectedViewOption.value };
    this.loadPlaylists();
    if (this.playlists.length === 0) {
      this.createPlaylist();
    }
  }

  public loadPlaylists() {
    this.playlistService.getPlaylists().subscribe((playlists) => {
      this.playlists = playlists;
      this.filteredPlaylists = [...this.playlists];
    });
  }

  public createPlaylist() {
    const newPlaylist = this.playlistService.createPlaylist({
      title: `My Playlist #${this.playlists.length + 1}`,
      cover: 'https://via.placeholder.com/150',
      description: 'Playlist',
      creator: 'NTT'
    });

    this.loadPlaylists();
    console.log('Created playlist:', newPlaylist);
  }
  public deletePlaylist(playlist: any) {
    this.playlistService.deletePlaylist(playlist.id);
    this.loadPlaylists();
    console.log('Deleted playlist:', playlist);
    if (this.playlists.length === 0) {
      this.playlistVisibilityChange.emit(false);
    }
  }

  public editPlaylist(playlist: any) {
    this.selectedPlaylist = { ...playlist };
    this.dialogVisible = true;
  }

  public savePlaylist() {
    this.playlistService.updatePlaylist(this.selectedPlaylist.id, {
      title: this.selectedPlaylist.title,
      description: this.selectedPlaylist.description,
      creator: this.selectedPlaylist.creator,
      cover: this.selectedPlaylist.cover,
    });
    this.dialogVisible = false;
    this.loadPlaylists();
  }

  public changeView(event: any) {
    console.log(event.value.value);
    this.dv.layout = event.value.value;
  }

  public showInput() {
    this.isInputVisible = true;
  }

  public hideInput() {
    this.isInputVisible = false;
  }

  public performSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (term) {
      this.filteredPlaylists = this.playlists.filter(
        (playlist) =>
          playlist.title.toLowerCase().includes(term) ||
          playlist.description.toLowerCase().includes(term) ||
          playlist.creator.toLowerCase().includes(term)
      );
    } else {
      this.filteredPlaylists = [...this.playlists];
    }
  }

  public sortItems() {
    switch (this.selectedSortOption.value) {
      case 'recents': {
        this.playlists.sort(
          (a, b) => b.lastModifiedDate.getTime() - a.lastModifiedDate.getTime()
        );
        break;
      }
      case 'recentlyAdded': {
        this.playlists.sort(
          (a, b) => b.addedDate.getTime() - a.addedDate.getTime()
        );
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
    this.filteredPlaylists = [...this.playlists];
  }

  public showMenuItem(event: MouseEvent, playlist: any) {
    event.preventDefault();
    this.selectedPlaylist = playlist;
    this.cmItem.show(event);
    this.cm.visible.set(false);
    console.log('Selected playlist:', playlist);
  }

  public showMenu(event: MouseEvent) {
    event.preventDefault();
    this.cm.show(event);
    this.cmItem.visible.set(false);
  }

  public getDetail(index: any) {
    console.log('Selected playlist:', index);
    this.route.navigate(['/playlist', index.id]);
  }
}
