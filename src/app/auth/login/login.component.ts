import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || "",
      [
        Validators.required,
      ]
    ],
    password: [
      '',
      [
        Validators.required
      ]
    ],
    remember: [
      false
    ]
  });

  public auth2: any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private ngZone: NgZone){
    
  }

  ngOnInit(): void {
    this.renderButton();
  }

  login(){

    if(this.loginForm.invalid){
      return;
    }

    this.usuarioService.login(this.loginForm.value)
      .subscribe(
        (resp) => {
          if(this.loginForm.get('remember')!.value){
            localStorage.setItem('email', this.loginForm.get('email')!.value);
          }
          this.router.navigateByUrl('/dashboard');
        },
        (err) => {
          console.log(err);
          Swal.fire('Error',err.error.msg, 'error')
        },
        () => {
        }
      )
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '921238640771-jbevf8hnm5bvf5m1h1mlt6v5np779opf.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element: any){
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        var id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe(
          resp => {
            this.ngZone.run( () => {
              this.router.navigateByUrl('/dashboard');
            });
          }
        );
      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

}
