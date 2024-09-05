import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RippleModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
