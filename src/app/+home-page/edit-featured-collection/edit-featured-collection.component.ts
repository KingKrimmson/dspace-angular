import {Component, OnInit} from '@angular/core';
import {FeaturedCollectionService} from "../../core/data/featured-collection.service";

@Component({
  selector: 'ds-edit-featured-collection',
  styleUrls: ['./edit-featured-collection.component.scss'],
  templateUrl: './edit-featured-collection.component.html'
})
export class EditFeaturedCollectionComponent implements OnInit {
  collectionId: string;

  constructor(
    private fcs: FeaturedCollectionService
  ) {

  }

  ngOnInit() {
    this.collectionId= this.fcs.collectionId.getValue();
  }

  onUpdate(): void {
    this.fcs.update(this.collectionId);
  }

}
