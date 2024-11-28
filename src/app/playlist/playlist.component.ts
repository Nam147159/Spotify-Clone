import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MainPanelService } from '../../services/main-panel-service/main-panel.service';
import { Album } from '../models/spotify.model';


@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    InputTextModule,
    DataViewModule,
    ListboxModule,
    ButtonModule,
    CommonModule,
    
  ],
  providers: [MainPanelService],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {
  layout: string = 'list';

  products!: Album[];

  constructor(
    private testService: MainPanelService
  ) {}

  ngOnInit() {
      this.testService.getPopularAlbums().subscribe((data: Album[]) => {
          this.products = data;
          console.log(this.products);
      });
  }
}
