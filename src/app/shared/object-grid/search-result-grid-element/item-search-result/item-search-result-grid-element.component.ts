import { Component } from '@angular/core';

import { renderElementsFor } from '../../../object-collection/shared/dso-element-decorator';
import { SearchResultGridElementComponent } from '../search-result-grid-element.component';
import { Item } from '../../../../core/shared/item.model';
import { ItemSearchResult } from '../../../object-collection/shared/item-search-result.model';
import { ViewMode } from '../../../../+search-page/search-options.model';

@Component({
  selector: 'ds-item-search-result-grid-element',
  styleUrls: ['../search-result-grid-element.component.scss', 'item-search-result-grid-element.component.scss'],
  templateUrl: 'item-search-result-grid-element.component.html'
})

@renderElementsFor(ItemSearchResult, ViewMode.Grid)
export class ItemSearchResultGridElementComponent extends SearchResultGridElementComponent<ItemSearchResult, Item> {}
