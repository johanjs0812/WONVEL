import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, QueryList, ViewChildren, inject} from '@angular/core';

import { FormatService } from '../service/format.service';
import { UserService } from '../service/users.service';

import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})

export class SingupComponent implements OnInit{
  constructor(
    private formatService: FormatService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  singupForm: FormGroup = new FormGroup({});
  errLg: string = '';
  isUnauthorizedError: boolean = false;

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const passwordControl = control.get('pass');
    const confirmPasswordControl = control.get('pass2');

    if (passwordControl && confirmPasswordControl) {
      const password: string = passwordControl.value;
      const confirmPassword: string = confirmPasswordControl.value;
      if (password !== confirmPassword) {
        return { 'mismatch': true };
      }
    }
    return null;
  }

  ngOnInit() {
    this.singupForm = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      'pass': new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$")
      ]),
      'pass2': new FormControl(null, Validators.required),
      'phone_number': new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.pattern("^[0-9]*$")
      ]),
      'full_name': new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern("^[a-zA-ZÀ-ỹ ]*$")
      ])
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit() {
    if (this.singupForm.valid) {
      this.singup(this.singupForm.value);
    } else {
      this.singupForm.markAllAsTouched();
    }
  }

  singup(data:any){
    console.log('dachay', data)
    this.userService.singup(data).subscribe(response => {
      console.log('true', data)
      if (response) {
        this.isUnauthorizedError = false;
        this.errLg = '';
        alert('Đăng ký tài khoản thành công, mời đăng nhập');
        this.router.navigate(['/login']);
      };
    }, error => {
      if (error.status === 401) {
        this.singupForm.markAllAsTouched();
        this.errLg = 'Số điện thoại và email đã được đăng ký';
        this.isUnauthorizedError = true;
      } else if (error.status === 500) {
        this.errLg = 'Có lỗi xảy ra khi đăng nhập';
        this.isUnauthorizedError = false;
      }
    });
  }

  @ViewChild('email') email: ElementRef | undefined;
  @ViewChild('pass') pass: ElementRef | undefined;

}
