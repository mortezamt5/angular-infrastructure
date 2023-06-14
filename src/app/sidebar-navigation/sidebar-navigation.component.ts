import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { MenuDto, MENUE_ITEMS } from './type/menu-dto';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent implements OnInit {
  constructor(private route: Router, private renderer:  Renderer2) {}

  firstDropDownOpen = false;
  secondDropDownOpen = false;
  showSidebar = true;
  menuItemsLevel1: MenuDto[] = [];
  menuItemsLevel2: MenuDto[] = [];
  currentLevel2Parent!: MenuDto;

  ngOnInit(): void {
    // const element = document.getElementById('main-container');
    // this.renderMenuItems(MENUE_ITEMS , element);
    this.init();
    this.openNav();
    this.manageMenuItems(MENUE_ITEMS, null);
    console.log(this.menuItemsLevel1, this.menuItemsLevel2);
  }
  showSubContainer(e: Event, model: MenuDto) {
    e.preventDefault();
    e.stopPropagation();
    this.currentLevel2Parent = model;
    if (model.routeLink) {
      this.route.navigate([model.routeLink]);
    } else {
      const mainContainer = document.getElementById('main-container');
      const subContainer = document.getElementById('sub-container');
      if (mainContainer && subContainer) {
        mainContainer.style.animation = 'mainAway 0.3s forwards';
        subContainer.style.animation = 'subBack 0.3s forwards';
      }
    }
  }
  init() {
    const sidenavRow = document.querySelectorAll('.sidenavRow');
    const mainContainer = document.getElementById('main-container');
    const subContainer = document.getElementById('sub-container');
    const mainMenu = document.getElementById('mainMenu');
    if (sidenavRow && mainContainer && subContainer && mainMenu) {
      sidenavRow.forEach((row) => {
        row.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          mainContainer.style.animation = 'mainAway 0.3s forwards';
          subContainer.style.animation = 'subBack 0.3s forwards';
        });
      });

      mainMenu.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mainContainer.style.animation = 'mainBack 0.3s forwards';
        subContainer.style.animation = 'subPush 0.3s forwards';
      });
    }
  }

  toggle() {
    if (this.showSidebar) {
      this.closeNav();
    } else {
      this.openNav();
    }
    this.showSidebar = !this.showSidebar;
  }
  openNav() {
    const mySidenav = document.getElementById('mySidenav');
    // const closeBtn = document.getElementById('closeBtn');
    // const overlay = document.getElementById('overlay');
    // if (mySidenav && closeBtn && overlay) {
    //   mySidenav.style.animation = 'expand 0.3s forwards';
    //   //closeBtn
    //   closeBtn.style.display = 'block';
    //   closeBtn.style.animation = 'show 0.3s';
    //   //Overlay
    //   overlay.style.display = 'block';
    //   overlay.style.animation = 'show 0.3s';
    // }
    if (mySidenav) {
      mySidenav.style.animation = 'expand 0.3s forwards';
    }
  }

  closeNav() {
    const mySidenav = document.getElementById('mySidenav');
    // const closeBtn = document.getElementById('closeBtn');
    // const overlay = document.getElementById('overlay');
    const mainContainer = document.getElementById('main-container');
    const subContainer = document.getElementById('sub-container');

    // if (mySidenav && closeBtn && overlay && mainContainer && subContainer) {
    if (mySidenav && mainContainer && subContainer) {
      mySidenav.style.animation = 'collapse 0.3s forwards';
      //closeBtn
      // closeBtn.style.animation = 'hide 0.3s';
      //Overlay
      // overlay.style.animation = 'hide 0.3s';

      setTimeout(() => {
        // closeBtn.style.display = 'none';
        // overlay.style.display = 'none';
        //Reset Menus
        mainContainer.style.animation = '';
        mainContainer.style.transform = 'translateX(0px)';
        subContainer.style.animation = '';
        subContainer.style.transform = 'translateX(380px)';
      }, 300);
    }
  }

  openPrimeVideo() {
    const subContainerContent = document.getElementById(
      'sub-container-content'
    );
    if (subContainerContent) {
      subContainerContent.innerHTML = `<div class="sidenavContentHeader">Prime Video</div>
    <a href="#"><div class="sidenavContent">All Videos</div></a>`;
    }
  }

  showContent(id: string) {
    const subContainerContent = document.getElementById(
      'sub-container-content'
    );
    if (subContainerContent) {
      const element = document.getElementById(id);
      if (element) {
        subContainerContent.innerHTML = element.innerHTML;
        const childRouter: any = document.querySelectorAll(`#${id} a`);
        // childRouter.addEventListener('click' , (e: any)=>{
        //   console.log(e);
        // })
        childRouter.forEach((row: any) => {
          this.renderer.listen(row, 'click', (e) => {
            console.log(e);
          });
        });
      }
    }
  }

  navigate(e: any, route: string) {
    this.route.navigate([route]);
  }

  renderMenuItems(items: MenuDto[], rendererElement: any) {
    // get Parent Level 1
    const menu = items.filter((f) => f.level === 'L1');
    menu.forEach((f) => {
      const sidenavContentHeaderElement = document.createElement('div');
      sidenavContentHeaderElement.innerText = f.label;
      sidenavContentHeaderElement.className = 'sidenavContentHeader';
      rendererElement.append(sidenavContentHeaderElement);
    });
  }

  manageMenuItems(items: MenuDto[], parentId: string | null) {
    items.forEach((f) => {
      if (parentId) {
        f.parentId = parentId;
      }
      if (f.level === 'L1') {
        this.menuItemsLevel1.push(f);
      }
      if (f.level === 'L2') {
        this.menuItemsLevel2.push(f);
      }
      if (f.children && f.children.length > 0) {
        this.manageMenuItems(f.children, f.id);
      }
    });
  }

  getLevel2Child() {
    return this.menuItemsLevel2.filter(
      (f) => f.parentId === this.currentLevel2Parent.id
    );
  }
}
