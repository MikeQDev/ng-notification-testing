import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';

/**
 * Well explained guide at https://itnext.io/cache-components-with-angular-routereusestrategy-3e4c8b174d5f
 */
export class CustomReuseStrategy implements RouteReuseStrategy {
    storedRouteHandles = new Map<string, DetachedRouteHandle>();
    allowRetriveCache = {
        'compose': true
    };

    // Invoked when we leave the current route. If returns true, store function will be invoked
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (this.allowRetriveCache.hasOwnProperty(this.getPath(route))) {
            return true;
        }
        return false;
    }
    // Manage how to store the RouteHandle when shouldDetached returns true, will be used in retrieve method
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.storedRouteHandles.set(this.getPath(route), handle);
    }
    // Called when component is loaded. If return true, called retrieve, else component is created from scratch
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        if (this.allowRetriveCache[this.getPath(route)]) {
            return this.storedRouteHandles.has(this.getPath(route));
        }
        return false;
    }
    // Called when shouldAttach returns true
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        return this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
    }
    /**
     * 
     * @param future route we are leaving
     * @param curr route we are landing
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

    private getPath(route: ActivatedRouteSnapshot): string {
        if (route.routeConfig !== null && route.routeConfig.path !== null) {
            return route.routeConfig.path;
        }
        return '';
    }
}
