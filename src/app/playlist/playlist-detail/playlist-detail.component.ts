import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  ],
  providers: [MessageService, ConfirmationService, DialogService],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss',
})
export class PlaylistDetailComponent implements OnInit {

  submitted = false;
  musicList: any[] = [];
  searchValue: string | undefined;
  showBtn: boolean = false;
  public sortOption: string = "list";
  public searchText = '';
  public loading = false;
  public playlistId: number = 0;
  public playlist: any = {};
  private searchText$ = new RxSubject<string>();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly dialogService: DialogService,
    private readonly playlistService: PlaylistService,
    private readonly fb: FormBuilder,
  ) {}

  public ngOnInit() {
    this.playlistId = this.getPlaylistId();
    this.playlistService.retrivePlaylist(this.playlistId).subscribe((data) => {
      this.playlist = data;
      this.musicList = this.playlist.musicList;
    });

    console.log(this.playlist);
  }

  private getPlaylistId(): number {
    const idStr = this.route.snapshot.paramMap.get('id');
    const id = Number(idStr);
    if (!idStr || isNaN(Number(idStr))) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid classroom id',
      });
      this.router.navigate(['/']);
    }
    return id;
  }

  public getValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  public handleSearch(query: string) {
    this.searchText$.next(query);
  }

  public sortBy(value: string) {
    this.sortOption = value;
  }

  public showBtnPlay(value: boolean) {
    return this.showBtn = value;
  }
}
