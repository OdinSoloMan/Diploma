import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'autoform',
    pathMatch: 'full'
  },
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
    path: 'outbox',
    loadChildren: () => import('./pages/outbox/outbox.module').then( m => m.OutboxPageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'output',
    loadChildren: () => import('./pages/output/output.module').then( m => m.OutputPageModule)
  },
  {
    path: 'autoform',
    loadChildren: () => import('./auth/autoform/autoform.module').then( m => m.AutoformPageModule)
  },  {
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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
