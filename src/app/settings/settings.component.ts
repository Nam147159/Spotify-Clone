import { Component } from "@angular/core";

import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {}
