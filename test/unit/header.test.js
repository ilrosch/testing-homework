import {it, describe, expect} from '@jest/globals'
import {render, screen } from "@testing-library/react";
import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Application } from "../../src/client/Application";
import '@testing-library/jest-dom/extend-expect';

const basename = '/'
const initState = { cart: {} }
const store = createStore(() => initState);

describe('Общие требования', () => {
    it('название магазина в шапке должно быть ссылкой на главную страницу', () => {
        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );
        const header = screen.queryByRole('link', {name: /Example store/i});
        expect(header).toHaveAttribute('href', '/');
    });

    it('в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', () => {
        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </BrowserRouter>
        );

        const catalog = screen.queryByRole('link', {name: /Catalog/i});
        expect(catalog).toHaveAttribute('href', '/catalog');

        const delivery = screen.queryByRole('link', {name: /Delivery/i});
        expect(delivery).toHaveAttribute('href', '/delivery');

        const contacts = screen.queryByRole('link', {name: /Contacts/i});
        expect(contacts).toHaveAttribute('href', '/contacts');

        const cart = screen.queryByRole('link', {name: /cart/i});
        expect(cart).toHaveAttribute('href', '/cart');
    });
});