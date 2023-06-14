import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  // providers: [ MenuService ]
})
export class BreadcrumbComponent {
  public pageTitle!: string;
  public breadcrumbs: {
    name: string;
    url: string;
  }[] = [];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public title: Title // private menuService: MenuService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = [];
        this.parseRoute(this.router.routerState.snapshot.root);
        this.pageTitle = '';
        this.breadcrumbs.forEach((breadcrumb) => {
          this.pageTitle += ' > ' + breadcrumb.name;
        });
        this.title.setTitle('Project Name ' + this.pageTitle);
      }
    });
  }

  private parseRoute(node: ActivatedRouteSnapshot) {
    if (node.data['breadcrumb']) {
      if (node.url.length) {
        let urlSegments: UrlSegment[] = [];
        node.pathFromRoot.forEach((routerState) => {
          urlSegments = urlSegments.concat(routerState.url);
        });
        const url = urlSegments
          .map((urlSegment) => {
            return urlSegment.path;
          })
          .join('/');
        this.breadcrumbs.push({
          name: node.data['breadcrumb'],
          url: '/' + url,
        });
      }
    }
    if (node.firstChild) {
      this.parseRoute(node.firstChild);
    }
  }

  public closeSubMenus() {
    // if (this.settings.menu == 'vertical') {
    //     this.menuService.closeAllSubMenus();
    // }
  }
}
