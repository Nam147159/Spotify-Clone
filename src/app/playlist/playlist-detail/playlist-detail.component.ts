import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Subject as RxSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { PlaylistService } from '../../../services/playlist-service/playlist.service';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Menu, MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    RippleModule,
    TableModule,
    ToastModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageModule,
    ToolbarModule,
    CardModule,
    OverlayPanelModule,
    SplitButtonModule,
    MenuModule,
  ],
  providers: [MessageService, ConfirmationService, DialogService],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss',
})
export class PlaylistDetailComponent implements OnInit {
  @Input() playlistId!: number;
  visible: boolean = false;
  submitted = false;
  musicList!: any[];
  searchValue: string | undefined;
  showBtn: boolean = false;
  musicOptions: MenuItem[] = [];
  playlistOptions: MenuItem[] = [];
  playlists!: any[];
  public sortOption: string = 'list';
  public searchText = '';
  public loading = false;
  // public playlistId: number = 0;
  public playlist: any = {};
  private searchText$ = new RxSubject<string>();
  selectedMusics: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly dialogService: DialogService,
    private readonly playlistService: PlaylistService,
    private readonly fb: FormBuilder
  ) {
    this.musicOptions = [
      {
        label: 'Remove form this playlist',
        icon: 'pi pi-trash',
        command: () => this.removeFromPlaylist(this.selectedMusics),
      },
    ];

    this.playlistOptions = [
      {
        label: 'Remove playlist',
        icon: 'pi pi-trash',
        command: () => this.removePlaylist(this.playlistId),
      },
      {
        label: 'Edit detail',
        icon: 'pi pi-pencil',
        command: () => {
          this.showDialog(); 
        },
      },
    ];
    console.log(this.musicOptions);
  }

  public ngOnInit() {
    // this.playlistId = this.getPlaylistId();
    this.playlistService.retrivePlaylist(this.playlistId).subscribe((data) => {
      this.playlist = data;
      this.musicList = this.playlist.musicList;
    });

    this.updateTable();

    console.log(this.playlist);
  }

  public updateTable() {
    this.playlistService.getPlaylists().subscribe((playlists) => {
      this.playlists = playlists;
    });
  }

  // private getPlaylistId(): number {
  //   const idStr = this.route.snapshot.paramMap.get('id');
  //   const id = Number(idStr);
  //   if (!idStr || isNaN(Number(idStr))) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'Invalid classroom id',
  //     });
  //     this.router.navigate(['/']);
  //   }
  //   return id;
  // }

  public getValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  public handleSearch(query: string) {
    this.searchText$.next(query);
  }

  public sortBy(value: string) {
    this.sortOption = value;
  }

  public addToPlaylist() {
    console.log('Add to playlist');
  }

  public removeFromPlaylist(value: any) {
    console.log('Remove from playlist', value);
    this.playlist.musicList = this.playlist.musicList.filter(
      (music: any) => music.id !== value.id
    );
    this.editPlaylist(); 

    this.updateTable();
  }

  public selectedMusic(value: any) {
    console.log('Selected music', value);
    this.selectedMusics = value;
  }

  public removePlaylist(id: number) {
    console.log('Remove playlist', id);
    this.playlistService.deletePlaylist(id);
    this.playlistService.updatePlaylistId(0);
  }

  public editPlaylist() {
    this.playlistService
      .updatePlaylist(this.playlistId, this.playlist)
      .subscribe((data) => {
        this.playlist = data;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Playlist updated',
        });
      });
    console.log('Edit playlist');
  }
  public showDialog() {
    this.visible = true;
}
}
