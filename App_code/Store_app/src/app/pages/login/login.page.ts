
/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    email: any = '';
    password: any = '';
    loggedIn: boolean;
    constructor(
        private menuController: MenuController,
        private router: Router,
        public util: UtilService,
        private navCtrl: NavController,
        private api: ApiService
    ) {
        this.loggedIn = false;
    }

    ngOnInit() {

    }

    login() {
        console.log('login');
        if (!this.email || !this.password) {
            this.util.showToast(this.util.getString('All Fields are required'), 'dark', 'bottom');
            return false;
        }
        const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailfilter.test(this.email)) {
            this.util.showToast(this.util.getString('Please enter valid email'), 'dark', 'bottom');
            return false;
        }
        this.loggedIn = true;
        const param = {
            email: this.email,
            password: this.password
        };
        this.api.post('users/login', param).subscribe((data: any) => {
            console.log(data);
            if (data && data.status === 200) {
                if (data && data.data && data.data.type === 'store') {
                    if (data.data.status === '1') {
                        localStorage.setItem('uid', data.data.id);
                        localStorage.setItem('name', data.data.first_name + ' ' + data.data.last_name);
                        localStorage.setItem('email', data.data.email);
                        localStorage.setItem('cover', data.data.cover);
                        const store = {
                            id: data.data.id
                        };
                        this.api.post('stores/getByUid', store).subscribe((data: any) => {
                            this.loggedIn = false;
                            console.log('*******************', data);
                            if (data && data.status === 200 && data.data && data.data.length) {
                                this.util.store = data.data[0];
                                localStorage.setItem('suid', data.data[0].id);
                                this.menuController.enable(true);
                                this.navCtrl.navigateRoot(['']);
                            }
                        }, error => {
                            this.loggedIn = false;
                            this.util.errorToast(this.util.getString('Something went wrong'));
                            console.log(error);
                        });

                    } else {
                        this.loggedIn = false;
                        console.log('not valid');
                        Swal.fire({
                            title: this.util.getString('Error'),
                            text: this.util.getString('Your are blocked please contact administrator'),
                            icon: 'error',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: this.util.getString('Need Help?'),
                            backdrop: false,
                            background: 'white'
                        }).then(status => {
                            if (status && status.value) {
                                localStorage.setItem('helpId', data.data.id);
                                this.router.navigate(['inbox']);
                            }
                        });
                    }
                } else {
                    this.loggedIn = false;
                    this.util.errorToast(this.util.getString('Not valid user'));
                    this.email = '';
                    this.password = '';
                }
            } else if (data && data.status === 500) {
                this.loggedIn = false;
                this.util.errorToast(data.data.message);
            } else {
                this.loggedIn = false;
                this.util.errorToast(this.util.getString('Something went wrong'));
            }
        }, error => {
            console.log(error);
            this.loggedIn = false;
            this.util.errorToast(this.util.getString('Something went wrong'));
        });

    }

    create() {
        this.router.navigate(['register']);
    }

    reset() {
        this.router.navigate(['forgot']);
    }

    ionViewDidEnter() {
        console.log('enter');
        this.menuController.enable(false);
    }



}
