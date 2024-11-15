import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  // message = '';

  // constructor(private apiService: ApiService) {}

  // ngOnInit() {
  //   this.apiService.getMessage().subscribe((data: any) => {
  //     this.message = data.message;
  //     console.log(this.message);
  //   });
  // }
}
