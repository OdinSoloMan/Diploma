import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'output',
    loadChildren: () => import('./pages/output/output.module').then( m => m.OutputPageModule)
  },
  {
    path: 'autoform',
    loadChildren: () => import('./auth/autoform/autoform.module').then( m => m.AutoformPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'infousers',
    loadChildren: () => import('./pages/infousers/infousers.module').then( m => m.InfousersPageModule)
  },
  {
    path: 'suggestnewsorevent',
    loadChildren: () => import('./pages/suggestnewsorevent/suggestnewsorevent.module').then( m => m.SuggestnewsoreventPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'helpfulinfo',
    loadChildren: () => import('./pages/helpfulinfo/helpfulinfo.module').then( m => m.HelpfulinfoPageModule)
  },
  {
    path: 'moredetailsinfo',
    loadChildren: () => import('./pages/moredetailsinfo/moredetailsinfo.module').then( m => m.MoredetailsinfoPageModule)
  },  {
    path: 'apply-service',
    loadChildren: () => import('./pages/apply-service/apply-service.module').then( m => m.ApplyServicePageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
