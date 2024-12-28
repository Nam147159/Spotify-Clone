import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../models/spotify.model';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'category-card',
  standalone: true,
  imports: [CardModule, CommonModule],  
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: Category;
  @Input() backgroundColor: string = this.getRandomColor();

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  ngOnInit() {
  }
 
  getImageUrl(): string | null {
    return this.category.icons && this.category.icons.length > 0
      ? this.category.icons[0].url : 'https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFC7do0jUgBzi';
  }
}
