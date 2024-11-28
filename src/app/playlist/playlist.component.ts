import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

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
  providers: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent {
  layout: string = `list`;

  products!: any[];

  constructor() // private testService: MainPanelService
  {}

  ngOnInit() {
    this.products = [
      { image: 1, name: 2, category: 3, price: 4 },
      { image: 1, name: 3, category: 4, price: 5 },
      { image: 1, name: 4, category: 5, price: 6 },
    ];
    
    // this.testService.getPopularAlbums().subscribe((data: any[]) => {
    //     this.products = data;
    //     console.log(this.products);
    // });
  }
}
