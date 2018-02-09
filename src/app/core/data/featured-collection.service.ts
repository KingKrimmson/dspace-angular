import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class FeaturedCollectionService {
  collectionId: BehaviorSubject<string>;

  constructor() {
    // Hard code your initial collection UUID here
    this.collectionId = new BehaviorSubject<string>("fdaa2492-255a-485d-b8d7-8ad42cc8ef3c");
  }

  update(newId: string) {
    this.collectionId.next(newId);
  }
}
