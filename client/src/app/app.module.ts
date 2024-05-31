import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from "./banner/banner.component";
import { SectionProductComponent } from "./section-product/section-product.component";
import { ProvincesSectionComponent } from "./provinces-section/provinces-section.component";
import { ExploreSectionComponent } from "./explore-section/explore-section.component";
import { TravelComponent } from "./travel/travel.component";
import { DetailComponent } from "./detail/detail.component";
import { InformationPaymentComponent } from "./information-payment/information-payment.component";
import { PaymentComponent } from "./payment/payment.component";
import { LoginComponent } from "./login/login.component";
import { SingupComponent } from "./singup/singup.component";

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    BannerComponent,
    SectionProductComponent,
    ProvincesSectionComponent,
    ExploreSectionComponent,
    DetailComponent,
    TravelComponent,
    InformationPaymentComponent,
    PaymentComponent,
    LoginComponent,
    SingupComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
