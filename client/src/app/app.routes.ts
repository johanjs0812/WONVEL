import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TravelComponent } from './travel/travel.component';
import { DetailComponent } from "./detail/detail.component";
import { InformationPaymentComponent } from "./information-payment/information-payment.component";
import { PaymentComponent } from "./payment/payment.component";
import { LoginComponent } from "./login/login.component";
import { SingupComponent } from "./singup/singup.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'du-lich', component: TravelComponent},
  { path: 'detail/:id', component: DetailComponent},
  { path: 'inforpm/:id', component: InformationPaymentComponent},
  { path: 'payment/:id', component: PaymentComponent},
  { path: 'login', component: LoginComponent},
  { path: 'singup', component: SingupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
