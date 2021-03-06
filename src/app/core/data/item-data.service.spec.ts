import { Store } from '@ngrx/store';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { TestScheduler } from 'rxjs/Rx';
import { GlobalConfig } from '../../../config/global-config.interface';
import { BrowseService } from '../browse/browse.service';
import { RemoteDataBuildService } from '../cache/builders/remote-data-build.service';
import { ResponseCacheService } from '../cache/response-cache.service';
import { CoreState } from '../core.reducers';
import { ItemDataService } from './item-data.service';
import { RequestService } from './request.service';

describe('ItemDataService', () => {
  let scheduler: TestScheduler;
  let service: ItemDataService;
  let bs: BrowseService;

  const requestService = {} as RequestService;
  const responseCache = {} as ResponseCacheService;
  const rdbService = {} as RemoteDataBuildService;
  const store = {} as Store<CoreState>;
  const EnvConfig = {} as GlobalConfig;

  const scopeID = '4af28e99-6a9c-4036-a199-e1b587046d39';
  const browsesEndpoint = 'https://rest.api/discover/browses';
  const itemBrowseEndpoint = `${browsesEndpoint}/author/items`;
  const scopedEndpoint = `${itemBrowseEndpoint}?scope=${scopeID}`;
  const serviceEndpoint = `https://rest.api/core/items`;
  const browseError = new Error('getBrowseURL failed');

  function initMockBrowseService(isSuccessful: boolean) {
    const obs = isSuccessful ?
      cold('--a-', { a: itemBrowseEndpoint }) :
      cold('--#-', undefined, browseError);
    return jasmine.createSpyObj('bs', {
      getBrowseURLFor: obs
    });
  }

  function initTestService() {
    return new ItemDataService(
      responseCache,
      requestService,
      rdbService,
      store,
      EnvConfig,
      bs
    );
  }

  describe('getScopedEndpoint', () => {
    beforeEach(() => {
      scheduler = getTestScheduler();
    });

    it('should return the endpoint to fetch Items within the given scope', () => {
      bs = initMockBrowseService(true);
      service = initTestService();

      const result = service.getScopedEndpoint(scopeID);
      const expected = cold('--b-', { b: scopedEndpoint });

      expect(result).toBeObservable(expected);
    });

    describe('if the dc.date.issue browse isn\'t configured for items', () => {
      beforeEach(() => {
        bs = initMockBrowseService(false);
        service = initTestService();
      });
      it('should throw an error', () => {
        const result = service.getScopedEndpoint(scopeID);
        const expected = cold('--#-', undefined, browseError);

        expect(result).toBeObservable(expected);
      });
    });

    describe('if the scope is not specified', () => {
      beforeEach(() => {
        bs = initMockBrowseService(true);
        service = initTestService();
        spyOn(service, 'getEndpoint').and.returnValue(cold('--b-', { b: serviceEndpoint }))
      });

      it('should return this.getEndpoint()', () => {
        const result = service.getScopedEndpoint(undefined);
        const expected = cold('--c-', { c: serviceEndpoint });

        expect(result).toBeObservable(expected);
      });
    });

  });
});
