import { createCustomElement } from '@/common';
import { Header, Menu, MenuButton, Modal, OrderList, OrderListItem, Served, ServedItem } from '@/components';
import { App } from '@/App';
import { Cafe } from '@/cafe';
import { Orders, Servings } from '@/domain';
import { FetchApi } from '@/api/FetchApi';

// const api =new InMemoryApi();
const api = new FetchApi();

new App(new Cafe(api, new Orders(), new Servings()));

export const CUSTOM_ELEMENTS = {
  HEADER: 'cafe-header',
  MENU: 'cafe-menu',
  MENU_BUTTON: 'cafe-menu-button',
  ORDER_LIST: 'cafe-order-list',
  ORDER_LIST_ITEM: 'cafe-order-list-item',
  MODAL: 'cafe-modal',
  SERVED: 'cafe-served',
  SERVED_ITEM: 'cafe-served-item',
};

createCustomElement(CUSTOM_ELEMENTS.HEADER, Header);
createCustomElement(CUSTOM_ELEMENTS.MENU, Menu);
createCustomElement(CUSTOM_ELEMENTS.MENU_BUTTON, MenuButton);
createCustomElement(CUSTOM_ELEMENTS.ORDER_LIST, OrderList);
createCustomElement(CUSTOM_ELEMENTS.ORDER_LIST_ITEM, OrderListItem);
createCustomElement(CUSTOM_ELEMENTS.MODAL, Modal);
createCustomElement(CUSTOM_ELEMENTS.SERVED, Served);
createCustomElement(CUSTOM_ELEMENTS.SERVED_ITEM, ServedItem);
