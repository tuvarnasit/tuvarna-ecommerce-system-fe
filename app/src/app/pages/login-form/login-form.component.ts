import { UserService } from '@/shared/services/user.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  isShowPass = false;

  handleShowPass() {
    this.isShowPass = !this.isShowPass;
  }

  public loginForm!: FormGroup;
  public formSubmitted = false;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.loginUser({ Email: email, Password: password }).subscribe({
        next: (response) => {
          if (response && response.token) {
            localStorage.setItem('jwtToken', response.token);
            this.toastrService.success('Login successful');
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.toastrService.error('Login failed. Please check your credentials.');
        }
      });

      this.loginForm.reset();
      this.formSubmitted = false;
    } else {
      this.toastrService.error('Please fill all required fields correctly!');
    }
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
