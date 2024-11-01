import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router:Router) { }

  //login method
  login(email:string, password:string){
    this.fireauth.signInWithEmailAndPassword(email, password).then( ()=>{
        localStorage.setItem('token', 'true');
          this.router.navigate(['./dashboard'])

    }, err=>{
        alert(err.message);
        this.router.navigate(['./login']);
    })    

  }

  //register method
  register(email:string, password:string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res =>{
      alert('Registration was successful')
      this.router.navigate(['./login']);

      this.sendEmailForVerification(res.user)


    }, err => {
      alert(err.message);
      this.router.navigate(['./register']);

    }
    )

  }

  //logout method
  logout(){
    this.fireauth.signOut().then( () =>{
      localStorage.removeItem('token');
      this.router.navigate(['./login']);
    }, 
    err =>{
      alert(err.message);

    }
    )
  }

  //forgot password
  forgotPassword(email:string){
    this.fireauth.sendPasswordResetEmail(email).then( () => {
      this.router.navigate(['/verify-email'])

    }, err =>{
      alert('Something went Wrong');
    })

  }

  //email verification
  sendEmailForVerification(user :any){
    user.sendEmailForVerification().then((res:any) =>{
   this.router.navigate(['/verify-email']);
     }, (err: any) => { 
         alert('Something went wrong. Not able t send mail to your email.')
      
    })
  }
}

