import { EVENT } from '@/constant';
import { Component } from '@/components';
import { Order } from '@/domain';
import { addCustomEventListener, dispatchCustomEvent } from '@/common';
import { Cafe, getBeverageName } from '@/cafe';
import { template } from './OrderListItem.template';
import { OPTION_GROUP_NAMES, OrderChangeType } from '@/@types';

export class OrderListItem extends Component {
  private order!: Order;

  private $removeOrderButton!: HTMLElement;
  private $editOrderButton!: HTMLElement;
  private $no!: HTMLElement;

  init() {
    this.$removeOrderButton = this.$container.querySelector('.remove-order') as HTMLElement;
    this.$editOrderButton = this.$container.querySelector('.edit-order') as HTMLElement;
    this.$no = this.$container.querySelector('[data-title="No"]') as HTMLElement;
  }

  setCafeWithOrder(cafe: Cafe, order: Order) {
    this.cafe = cafe;
    this.order = order;
  }

  bindListener() {
    addCustomEventListener(EVENT.CHANGE_OPTION, e => {
      const { order }: OrderChangeType = e.detail;

      if (order === this.order) {
        this.updateOptions();
      }
    });
  }

  bindEvents() {
    this.$removeOrderButton.addEventListener('click', e => {
      e.preventDefault();

      this.removeOrder();
    });

    this.$editOrderButton.addEventListener('click', e => {
      e.preventDefault();

      this.toggleEditMode();
    });
  }

  updateOptions() {
    OPTION_GROUP_NAMES.forEach(optionGroupName => {
      const $el = this.$container.querySelector(`[data-title="${optionGroupName}"]`) as HTMLElement;
      $el.textContent = this.order.getSelectedOptionValue(optionGroupName);
    });
  }

  removeOrder() {
    dispatchCustomEvent(EVENT.ORDER_LIST_ITEM_REMOVED, { orderListItem: this });

    this.$container.remove();

    dispatchCustomEvent(EVENT.ORDER_REMOVED, { order: this.order });
  }

  setNo(no: number) {
    this.$no.textContent = no + '';
  }

  toggleEditMode() {
    const key = 'contentEditAble';

    const contentEditAble = this.$editOrderButton.getAttribute(key);

    if (contentEditAble === 'true') {
      this.$editOrderButton.removeAttribute(key);
    } else {
      this.$editOrderButton.setAttribute(key, 'true');
    }
  }

  template() {
    const order = this.order;
    const beverageName = getBeverageName(order.beverageId);

    return template(beverageName, order);
  }
}
