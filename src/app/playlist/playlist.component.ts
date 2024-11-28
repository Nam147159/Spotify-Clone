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
    DropdownModule
  ],
  providers: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent {
  products!: any[];

  sortOptions = [
    { label: 'Recents', value: 'recents' },
    { label: 'Recently Added', value: 'recentlyAdded' },
    { label: 'Alphabetical', value: 'alphabetical' },
    { label: 'Creator', value: 'creator' },
    { label: 'Custom Order', value: 'customOrder' },
  ];
  selectedSortOption = this.sortOptions[1];

  viewOptions = [
    { label: 'Compact', icon: 'pi pi-bars', value: 'compact' },
    { label: 'List', icon: 'pi pi-list', value: 'list' },
    { label: 'Grid', icon: 'pi pi-th-large', value: 'grid' },
  ];
  selectedViewOption = this.viewOptions[0];
  constructor(){}

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
