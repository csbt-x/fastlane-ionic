/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';
// import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class UtilService {
    loader: any;
    isLoading = false;

    details: any;

    private address = new Subject<any>();
    private coupon = new Subject<any>();
    private review = new Subject<any>();
    orders: any;

    private changeLocation = new Subject<any>();

    private loggedIn = new Subject<any>();

    private profile = new Subject<any>();

    private orderChange = new Subject<any>();


    public translations: any[] = [];

    public appClosed: boolean;

    public appClosedMessage: any = '';

    public direction: any;
    public currecny: any;
    public cside: any;

    public appPages: any[] = [];

    public store: any;

    public general: any;
    constructor(
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private toastCtrl: ToastController,
        public router: Router,
        private navCtrl: NavController,
        private api: ApiService,
        private menuCtrl: MenuController
    ) {
        this.appPages = [
            {
                title: 'Home',
                url: 'tabs/tab1',
                icon: 'assets/sidemenu/home.png',
                icon2: 'assets/sidemenu/home2.png',
                icn: 'home-outline'
            },
            {
                title: 'Profile',
                url: 'tabs/tab3',
                icon: 'assets/sidemenu/user.png',
                icon2: 'assets/sidemenu/user2.png',
                icn: 'person-outline'
            },
            {
                title: 'Language',
                url: 'tabs/tab3/languages',
                icon: 'assets/sidemenu/language.png',
                icon2: 'assets/sidemenu/language2.png',
                icn: 'language-outline'
            },
            {
                title: 'Contact Us',
                url: 'tabs/tab3/contacts',
                icon: 'mail-outline',
                icn: 'mail-outline'
            },
            {
                title: 'About',
                url: 'tabs/tab3/about',
                icon: 'assets/sidemenu/info.png',
                icon2: 'assets/sidemenu/info2.png',
                icn: 'alert-circle-outline'
            },
            {
                title: 'FAQs',
                url: 'tabs/tab3/faqs',
                icon: 'assets/sidemenu/contact.png',
                icon2: 'assets/sidemenu/contact2.png',
                icn: 'flag-outline'
            },
            {
                title: 'Help',
                url: 'tabs/tab3/help',
                icon: 'assets/sidemenu/contact.png',
                icon2: 'assets/sidemenu/contact2.png',
                icn: 'help-circle-outline'
            },
        ];
    }

    /*
    Start Loader
    Call this method to Start your Loader
    */

    publishAddress(data: any) {
        this.address.next(data);
    }

    publishReview(data: any) {
        this.review.next(data);
    }

    publishProfile(data: any) {
        this.profile.next(data);
    }

    observProfile(): Subject<any> {
        return this.profile;
    }

    newOrder() {
        this.orderChange.next();
    }

    subscribeOrder(): Subject<any> {
        return this.orderChange;
    }

    getLanguage() {
        // return this.translateService.currentLang;
    }

    getReviewObservable(): Subject<any> {
        return this.review;
    }

    publishLocation(data) {
        this.changeLocation.next(data);
    }

    subscribeLocation(): Subject<any> {
        return this.changeLocation;
    }

    publishLoggedIn(data) {
        this.loggedIn.next(data);
    }

    subscribeLoggedIn(): Subject<any> {
        return this.loggedIn;
    }


    getObservable(): Subject<any> {
        return this.address;
    }

    publishCoupon(data: any) {
        this.coupon.next(data);
    }

    getCouponObservable(): Subject<any> {
        return this.coupon;
    }

    setOrders(data) {
        this.orders = null;
        this.orders = data;
    }

    openMenu() {
        this.menuCtrl.toggle();
    }

    gerOrder() {
        return this.orders;
    }

    async show(msg?) {
        this.isLoading = true;
        return await this.loadingCtrl.create({
            message: msg,
            spinner: 'bubbles',
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log('abort presenting'));
                }
            });
        });
    }

    async hide() {
        this.isLoading = false;
        return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
    }

    /*
      Show Warning Alert Message
      param : msg = message to display
      Call this method to show Warning Alert,
      */
    async showWarningAlert(msg) {
        const alert = await this.alertCtrl.create({
            header: 'Warning',
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    async showSimpleAlert(msg) {
        const alert = await this.alertCtrl.create({
            header: '',
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    /*
     Show Error Alert Message
     param : msg = message to display
     Call this method to show Error Alert,
     */
    async showErrorAlert(msg) {
        const alert = await this.alertCtrl.create({
            header: 'Error',
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    /*
       param : email = email to verify
       Call this method to get verify email
       */
    async getEmailFilter(email) {
        const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
        if (!(emailfilter.test(email))) {
            const alert = await this.alertCtrl.create({
                header: 'Warning',
                message: 'Please enter valid email',
                buttons: ['OK']
            });
            await alert.present();
            return false;
        } else {
            return true;
        }
    }


    /*
      Show Toast Message on Screen
       param : msg = message to display, color= background
       color of toast example dark,danger,light. position  = position of message example top,bottom
       Call this method to show toast message
       */

    showToast(msg, colors, positon) {
        this.translate(msg).then(async (data) => {
            const toast = await this.toastCtrl.create({
                message: data,
                duration: 2000,
                color: colors,
                position: positon
            });
            toast.present();
        });

    }

    async shoNotification(msg, colors, positon) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 4000,
            color: colors,
            position: positon,
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    handler: () => {
                        // console.log('Cancel clicked');
                    }
                }
            ]
        });
        toast.present();
    }

    errorToast(msg) {
        this.translate(msg).then(async (data) => {
            const toast = await this.toastCtrl.create({
                message: data,
                duration: 2000,
            });
            toast.present();
        });
    }

    apiErrorHandler(err) {
        // console.log('Error got in service =>', err)
        if (err.status === -1) {
            this.showErrorAlert('Failed To Connect With Server');
        } else if (err.status === 401) {
            this.showErrorAlert('Unauthorized Request!');
            this.navCtrl.navigateRoot('/login');
        } else if (err.status === 500) {
            this.showErrorAlert('Somethimg Went Wrong..');
        }
    }


    makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


    translate(str): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const value = this.translations[str];
            if (value && value !== undefined) {
                console.log('hope');
                resolve(value);
            } else {
                console.log('nope');
                resolve(str);
            }
        });
    }


    getString(str) {
        if (this.translations[str]) {
            return this.translations[str];
        }
        return str;
    }

}
