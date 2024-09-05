import { Component, OnDestroy } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { RippleModule } from "primeng/ripple";
import { CommonModule } from "@angular/common";
import { finalize, Subscription } from "rxjs";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../../../core/services/user.service";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { CartService } from "../../../core/services/cart.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RippleModule,
    ReactiveFormsModule,
    ProgressSpinnerModule
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css"
})
export class LoginComponent implements OnDestroy {
  private subscriptions = new Subscription();
  returnUrl: string = '';
  loginForm: FormGroup;

  loading: boolean = false;
  errorMessage = "";

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private FB: FormBuilder) {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/products-list";

    this.loginForm = this.FB.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  onLogin() {
    this.errorMessage = "";

    if (!this.loginForm.valid) {
      if (this.loginForm.get("email")?.hasError("required")) {
        if (this.loginForm.get("password")?.hasError("required")) {
          this.errorMessage =  "Missing email and password.";
        } else {
          this.errorMessage = "Missing email.";
        }
      } else {
          this.errorMessage = "Missing password."
      }
    } else {
      this.loading = true;
      document.body.style.overflow = "hidden";

      this.subscriptions.add(
        this.authService.login(this.loginForm.value).pipe(
          finalize(() => {
            this.loading = false;
            document.body.style.overflow = "visible";
          })).subscribe({
          next: (data) => {
            sessionStorage.setItem("accessToken", data.accessToken);
            this.userService.getUserProfile(data.accessToken);
            this.cartService.getCart(data.accessToken);
            this.router.navigate([this.returnUrl]);
          },
          error: (error) => {
            if (error.error.message === "auth/invalid-credential") {
              this.errorMessage = "Incorrect password or email."
            } else {
              this.errorMessage = "An unexpected error occurred."
            }
          }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
