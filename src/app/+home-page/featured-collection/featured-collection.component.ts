import {Component, OnDestroy, OnInit} from '@angular/core';
import {Collection} from "../../core/shared/collection.model";
import {RemoteData} from "../../core/data/remote-data";
import {CollectionDataService} from "../../core/data/collection-data.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {hasValue} from "../../shared/empty.util";
import {FeaturedCollectionService} from "../../core/data/featured-collection.service";


@Component({
  selector: 'ds-featured-collection',
  styleUrls: ['./featured-collection.component.scss'],
  templateUrl: './featured-collection.component.html'
})
export class FeaturedCollectionComponent implements OnInit, OnDestroy {
  collection: Observable<RemoteData<Collection>>;
  private sub: Subscription;

  constructor(
    private fcs: FeaturedCollectionService,
    private cds: CollectionDataService
  ) {

  }

  ngOnInit(): void {
    this.sub = this.fcs.collectionId.subscribe((id) => {
      this.collection = this.cds.findById(id);
    });
  }

  ngOnDestroy(): void {
    if (hasValue(this.sub)) {
      this.sub.unsubscribe();
    }
  }
}
