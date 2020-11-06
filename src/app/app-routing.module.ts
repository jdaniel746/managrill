import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: ``, loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomeModule),
      canActivate:[]
  },
  {
    path: `about`, loadChildren: () =>
      import('./pages/about/about.module').then(m => m.AboutModule),
      canActivate:[]
  },
  {
    path: `blog`, loadChildren: () =>
      import('./pages/blog/blog.module').then(m => m.BlogModule),
      canActivate:[]
  },
  {
    path: `contact`, loadChildren: () =>
      import('./pages/contact/contact.module').then(m => m.ContactModule),
      canActivate:[]
  },
  {
    path: `services`, loadChildren: () =>
      import('./pages/services/services.module').then(m => m.ServicesModule),
      canActivate:[]
  },
  {
    path: `single`, loadChildren: () =>
      import('./pages/single/single.module').then(m => m.SingleModule),
      canActivate:[]
  },
  {
    path: `gallery`, loadChildren: () =>
      import('./pages/gallery/gallery.module').then(m => m.GalleryModule),
      canActivate:[]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
