import { addCustomEventListener, dispatchCustomEvent } from '@/common';
import { EVENT } from '@/constant';
import { Component, Modal } from '@/components';
import { template } from './Menu.template';
import { getBeverageById } from '@/cafe';
import { Order } from '@/domain';

const CLASS_NAME_NONE_ORDER = 'none-order';
const CLASS_NAME_SELECTED = 'selected';

const MSG_ALERT = '주문을 추가하세요';

export class Menu extends Component {
  private $form!: HTMLElement;
  private $buttons!: HTMLElement;

  init() {
    this.$form = this.$container.querySelector('.coffee-add-area form') as HTMLElement;
    this.$buttons = this.$container.querySelector('.select-coffee-container .buttons') as HTMLElement;

    this.createMenus();
  }

  createMenus(): void {
    this.cafe.menu.getMenuItemElements().forEach($menuItem => {
      this.$buttons.appendChild($menuItem);
    });
  }

  bindEvents() {
    addCustomEventListener(EVENT.ORDER_ADDED, e => {
      e.preventDefault();

      this.showAndActiveMenu(e.detail.order);
    });

    addCustomEventListener(EVENT.ORDER_REMOVED, e => {
      e.preventDefault();

      this.hideAndUnActiveMenu(e.detail.order);
    });

    this.$form.addEventListener('submit', event => {
      event.preventDefault();

      if (this.cafe.orders.isEmpty()) {
        return alert(MSG_ALERT);
      }

      const order = this.cafe.orders.firstOrder();
      const beverage = getBeverageById(order.beverageId);

      (document.createElement('cafe-modal') as Modal).open(order, beverage);

      dispatchCustomEvent(EVENT.ORDER_SUBMIT);
    });
  }

  showAndActiveMenu(order: Order): void {
    this.show();
    this.activeMenu(order);
  }

  hideAndUnActiveMenu(order: Order): void {
    if (this.cafe.orders.isEmpty()) {
      this.hide();
    }

    if (this.cafe.orders.getOrderGroup(order.beverageId).isEmpty()) {
      this.unActiveMenu(order);
    }
  }

  getMenuByOrder(order: Order): HTMLElement {
    return this.$container.querySelector(`[data-beverage-id="${order.beverageId}"]`) as HTMLElement;
  }

  activeMenu(order: Order): void {
    this.getMenuByOrder(order).classList.add(CLASS_NAME_SELECTED);
  }

  unActiveMenu(order: Order): void {
    this.getMenuByOrder(order).classList.remove(CLASS_NAME_SELECTED);
  }

  hide(): void {
    this.$container.classList.add(CLASS_NAME_NONE_ORDER);
  }

  show(): void {
    this.$container.classList.remove(CLASS_NAME_NONE_ORDER);
  }

  template() {
    return template;
  }
}
