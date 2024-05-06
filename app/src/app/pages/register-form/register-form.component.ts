import { UserService } from '@/shared/services/user.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  isShowPass = false;
  public registerForm!: FormGroup;
  public formSubmitted = false;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  handleShowPass() {
    this.isShowPass = !this.isShowPass;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.userService.registerUser({
        Username: name,
        Email: email,
        Password: password,
        Role: 'CUSTOMER'
      }).subscribe({
        next: (response) => {
          this.toastrService.success('Registration successful');
          this.router.navigate(['/pages/login']);
        },
        error: (error) => {
          this.toastrService.error(`Registration failed: ${error.error.message}`);
        }
      });
      this.registerForm.reset();
      this.formSubmitted = false;
    } else {
      this.toastrService.error('Please fill all required fields correctly!');
    }
  }

  get name() { return this.registerForm.get('name') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
}

