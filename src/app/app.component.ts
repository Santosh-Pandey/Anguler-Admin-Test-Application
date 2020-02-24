import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component for session checking idle
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myanguler';

  showHead: boolean = false;
  sessTimeout: number;

  constructor(private router: Router, private bnIdle: BnNgIdleService) {
    // on route change to '/login', set the variable showHead to false
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login' || event['url'] == '/' || event['url'] == '') {
            this.showHead = false;
          } else {
            // console.log("NU")
            this.showHead = true;
          }
        }
      });


      // Session time out  if any activity not present given time(1000 Sec.)

      this.sessTimeout = environment.sessionTimeOut;

      this.bnIdle.startWatching(this.sessTimeout).subscribe((res) => {
        if (res) {
            console.log ('session expired');
            localStorage.clear();
            this.router.navigate(['/display']);
        }
      });


    }


}
