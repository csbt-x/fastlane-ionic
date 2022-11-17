/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// translate
import { HttpClientModule } from '@angular/common/http';
import { PipeModule } from './pipes/pipe.module';
import { CategoryPageModule } from './pages/category/category.module';
import { ComponentsModule } from './components/components.module';

import { Camera } from '@ionic-native/camera/ngx';
import { FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Printer } from '@ionic-native/printer/ngx';
import { SelectDriversPageModule } from './pages/select-drivers/select-drivers.module';
import { SubCategoryPageModule } from './pages/sub-category/sub-category.module';
@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        HttpClientModule,
        AppRoutingModule,
        PipeModule,
        CategoryPageModule,
        SubCategoryPageModule,
        SelectDriversPageModule,
        ComponentsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        FileTransferObject,
        HTTP,
        OneSignal,
        Printer,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
