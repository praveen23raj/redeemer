import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MinistriesComponent } from './pages/ministries/ministries.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LeadershipComponent } from './pages/leadership/leadership.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'ministries', component: MinistriesComponent },
 { path: 'contact', component: ContactComponent },
 {path:'leadership', component:LeadershipComponent},
  { path: '**', redirectTo: '' }
];
