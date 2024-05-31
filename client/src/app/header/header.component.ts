import { Component, OnInit } from '@angular/core';
import { UserService } from "../service/users.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  user: any;

  constructor(
    private userService: UserService,
    private router: Router

  )
  {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {

  }

  logout() {
    localStorage.removeItem('user');
    this.userService.setUser(null);
    this.router.navigate(['/login']);
  }


}
