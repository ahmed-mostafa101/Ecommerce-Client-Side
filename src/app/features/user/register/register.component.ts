import { Component, OnDestroy } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { RippleModule } from "primeng/ripple";
import { CommonModule } from "@angular/common";
import { finalize, Subscription } from "rxjs";
import { AbstractControl, FormBuilder, FormGroup,
          ReactiveFormsModule, ValidatorFn, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RippleModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css"
})
export class RegisterComponent implements OnDestroy {
  private subscriptions = new Subscription();
  registerForm: FormGroup;
  successFlag: boolean = false;
  displayPopup: boolean = false;
  loading: boolean = false;
  popupMessage: string = "";
  popupIcon: string = "";

  constructor(private FB: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.FB.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    }, { validator: this.passwordsMatchValidator() });
  }

  passwordsMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const password = formGroup.get("password");
      const confirmPassword = formGroup.get("confirmPassword");
      return (password && confirmPassword && password.value === confirmPassword.value? null : { mismatch: true });
    };
  }

  onRegister() {
    if(this.registerForm.valid) {
      document.body.style.overflow = "hidden";
      this.displayPopup = true;
      this.loading = true;

      this.subscriptions.add(
        this.authService.register(this.registerForm.value).pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe({
          next: () => {
            this.popupMessage = "Your account has been created successfully.";
            this.popupIcon = "images/icons/done.png";
            this.successFlag = true;
          },
          error: (error) => {
            switch (error.error.message) {
              case "auth/email-already-in-use":
                this.popupMessage = "This email is already in use.";
                this.popupIcon = "images/icons/used-email.png"
                break;
              case "auth/invalid-email":
                this.popupMessage = "The email address is not valid.";
                this.popupIcon = "images/icons/invalid-email.png";
                break;
              default:
                this.popupMessage = "An unexpected error occurred.";
                this.popupIcon = "images/icons/error.png";
            }
          }
        })
      );
    }
  }

  closePopup() {
    this.displayPopup = false;
    document.body.style.overflow = "visible";
  }

  goToSignIn() {
    this.displayPopup = false;
    this.router.navigate(["/login"]);
    document.body.style.overflow = "visible";
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
