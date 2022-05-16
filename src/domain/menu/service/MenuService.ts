import { Menu, MenuItem, Api } from '@/domain';

export class MenuService {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  private getMenuItems(): MenuItem[] {
    return this.api.getBeverages().map(item => new MenuItem(item.id));
  }

  public getMenu(): Menu {
    return new Menu(this.getMenuItems());
  }
}
