import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services';
import { Boss } from 'src/app/shared/models/boss';
import * as  sha256 from 'async-sha256';

import Swal from 'sweetalert2'
import { Global } from 'src/app/global';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-boss',
  templateUrl: './login-boss.component.html',
  styleUrls: ['./login-boss.component.css']
})
export class LoginBossComponent implements OnInit {
  currentBoss: Boss = new Boss();
  name: any;
  passAdmin: string = "C8E7279C";
  mailAdmin: string = "idealToJob@gmail.com";
  registerForm: FormGroup;
    submitted = false;
  constructor(
    public userService: UserService, public titleService:Title,public router: Router,public dialog:MatDialog,
    public formBuilder: FormBuilder, public _snackBar: MatSnackBar ) { 
      this.titleService.setTitle("משתפת משרה | כניסה");

    }
  @ViewChild(NgForm) myForm: NgForm;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[ Validators.required, Validators.minLength(4), Validators.maxLength(16)]]

    });
    // this.currentBoss=this.global.CurrentBoss;
  }
  get f() { return this.registerForm.controls; }
  //  NgForm.resetForm() 
  async login() {
    this.dialog.closeAll();
    if (this.currentBoss.BossPassword === this.passAdmin && this.currentBoss.BossMail === this.mailAdmin)
      this.router.navigate(['nbvladmin']);
    else {
      var password = this.registerForm.controls["password"].value;
      this.currentBoss.BossMail = this.registerForm.controls["email"].value;
      this.currentBoss.BossPassword = await sha256(password);
      // this.currentBoss.BossPassword = await sha256(this.currentBoss.BossPassword);
      localStorage.setItem("token", this.currentBoss.BossPassword);
      // this.myForm.resetForm();


      this.userService.loginBoss(this.currentBoss).subscribe((res: any) => {
        if (res) {
        this.userService.boss=res;
        this.userService.user=null;
          localStorage.setItem("token", this.currentBoss.BossPassword);
          localStorage.setItem("BossCompanyId", res.BossCompanyId.toString());
          localStorage.setItem("isBoss", "1");

          // localStorage.setItem("UserPassword",this.currentUser.password);
          localStorage.setItem("UserMail", res.BossMail);
          localStorage.setItem("UserName", res.BossName);
          localStorage.setItem("UserId", res.BossId.toString());
          // this.global.CurrentBoss=res;
          Swal.fire({
            title: 'ברוכה השבה',
            text: 'נרשמת בהצלחה',
            type: 'success',
            confirmButtonText: 'המשך'
          })
          this.router.navigate(['home']);
          // this.currentBoss=res;
          // this.userService.boss=res;
          // var token = JSON.parse(res.Value.TokenJson)
          // this.userService.changeToken(token.access_token);

          // var user = res.Value.User;
          // localStorage.token = token.access_token;
          // this.userService.setUser(user);
          this.name += res;
          // this.userService.user.UserName=null;
          // localStorage.removeItem("UserId");
          // localStorage.removeItem("UserMail");
          // localStorage.setItem("UserName",this.currentBoss.BossName);
          // localStorage.setItem("BossPassword",this.currentBoss.BossPassword);
          // localStorage.setItem("BossId",this.currentBoss.BossId.toString());
          // localStorage.setItem("BossCompanyId",this.currentBoss.BossCompanyId.toString());
          // if(this.currentBoss.BossPassword=="963852741+"&&this.currentBoss.BossMail=="idealToJob@gmail.com")
          // localStorage.setItem("manager","manager");
        }
        else {
          // this.router.navigate(['register/register-boss']);
          this._snackBar.open('המייל ו/או הסיסמה שגויים', 'X');
          localStorage.removeItem("BossPassword");
        }
      },
        err => {

        })
    }
  }
  onNoClick(): void {
    this.dialog.closeAll();
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    else //if (this.registerForm.invalid)
     {
      this.login();
    }
  }
}


// get f() { return this.loginForm.controls; }

// onSubmit() {
//     this.submitted = true;

//     // stop here if form is invalid
//     if (this.loginForm.invalid) {
//         return;
//     }

//     this.loading = true;
//     this.authenticationService.login(this.f.username.value, this.f.password.value)
//         .pipe(first())
//         .subscribe(
//             data => {
//                 this.router.navigate([this.returnUrl]);
//             },
//             error => {
//                 this.alertService.error(error);
//                 this.loading = false;
//             });
// }
// }