import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomePageRoutingModule } from './home-page-routing.module';

import { HomePageComponent } from './home-page.component';
import { TopLevelCommunityListComponent } from './top-level-community-list/top-level-community-list.component';
import { FeaturedCollectionComponent } from './featured-collection/featured-collection.component';
import { EditFeaturedCollectionComponent } from './edit-featured-collection/edit-featured-collection.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePageComponent,
    TopLevelCommunityListComponent,
    HomeNewsComponent,
    FeaturedCollectionComponent,
    EditFeaturedCollectionComponent
  ]
})
export class HomePageModule {

}
