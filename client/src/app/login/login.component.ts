import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, QueryList, ViewChildren, inject} from '@angular/core';

import { FormatService } from '../service/format.service';
import { UserService } from '../service/users.service';

import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  constructor(
    private formatService: FormatService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  loginForm: FormGroup = new FormGroup({});
  errLg: string = '';
  isUnauthorizedError: boolean = false;

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
      ]),
      'pass': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.login(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  login(data:any){
    this.userService.login(data).subscribe(response => {
      if (response !== false) {
        localStorage.setItem('user', JSON.stringify(response));
        this.userService.setUser(response);
        this.router.navigate(['/home']);
      } else {
        this.loginForm.markAllAsTouched();
        this.errLg = 'Email hoặc mật khẩu chưa đúng';
        this.isUnauthorizedError = false;
      }
    }, error => {
      this.loginForm.markAllAsTouched();
      if (error.status === 401) {
        this.errLg = 'Email hoặc mật khẩu chưa đúng';
        this.isUnauthorizedError = true;
      } else {
        this.errLg = 'Có lỗi xảy ra khi đăng nhập';
        this.isUnauthorizedError = false;
      }
    });
  }


  @ViewChild('email') email: ElementRef | undefined;
  @ViewChild('pass') pass: ElementRef | undefined;

}
