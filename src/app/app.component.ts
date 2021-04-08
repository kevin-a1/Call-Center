import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Call-Center';

  logged_in: boolean = (localStorage.getItem('logged_in') != null && localStorage.getItem('logged_in') == 'true');
}
