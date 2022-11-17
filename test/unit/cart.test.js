import {it, describe, expect} from '@jest/globals'
import {fireEvent, render, screen} from "@testing-library/react";
import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Application } from "../../src/client/Application";
import '@testing-library/jest-dom/extend-expect';
import {Home} from "../../src/client/pages/Home";
import {Catalog} from "../../src/client/pages/Catalog";
import {Delivery} from "../../src/client/pages/Delivery";
import {Contacts} from "../../src/client/pages/Contacts";
import {commerce} from "faker";
import {MemoryRouter} from "react-router";
import {Cart} from "../../src/client/pages/Cart";
import {ExampleApi} from "../../src/client/api";
import {initStore} from "../../src/client/store";

const basename = '/'


describe('Тестируем корзину', () => {
    it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней: ', () => {
        const initState = {
            cart: [
                { id: 1, name: "order_1", price: 100, count: 1 },
                { id: 2, name: "order_2", price: 20, count: 2 },
            ],
            products: [
                { id: 1, name: "order_1", price: 100 },
                { id: 2, name: "order_2", price: 20 },
            ]
        }
        const store = createStore(() => initState);

        render(
            <MemoryRouter initialEntries={['/cart']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.queryByRole('link', { name: /Cart \(2\)/i})).toBeInTheDocument();
    });

    it('В корзине должна отображаться таблица с добавленными в нее товарами: ', () => {
        const initState = {
            cart: {
                1: { id: 1, name: "order_1", price: 100, count: 1 },
                2: { id: 2, name: "order_2", price: 20, count: 2 },
            },
            products: [
                { id: 1, name: "order_1", price: 100 },
                { id: 2, name: "order_2", price: 20 },
            ]
        }
        const store = createStore(() => initState);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByTestId('1')).toBeInTheDocument()
        expect(screen.getByTestId('2')).toBeInTheDocument()
    });

    it('Для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа: ', () => {
        const initState = {
            cart: {
                1: { id: 1, name: "order_1", price: 100, count: 3 },
                2: { id: 2, name: "order_2", price: 20, count: 4 },
            },
            products: [
                { id: 1, name: "order_1", price: 100 },
                { id: 2, name: "order_2", price: 20 },
            ]
        }
        const store = createStore(() => initState);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.queryByText('order_1')).toBeInTheDocument()
        expect(screen.queryByText('$100')).toBeInTheDocument()
        expect(screen.queryByText('3')).toBeInTheDocument()
        expect(screen.queryByText('$300')).toBeInTheDocument()

        expect(screen.queryByText('order_2')).toBeInTheDocument()
        expect(screen.queryByText('$20')).toBeInTheDocument()
        expect(screen.queryByText('4')).toBeInTheDocument()
        expect(screen.queryByText('$80')).toBeInTheDocument()

    });

    it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться:', () => {
        const cart = {
            getState: () => ({
                1: { id: 1, name: "order_1", price: 100, count: 3 },
                2: { id: 2, name: "order_2", price: 20, count: 4 },
            })
        }
        const api = new ExampleApi('/');

        const store = initStore(api, cart);

        render(
            <MemoryRouter initialEntries={['/cart']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        )

        fireEvent.click(screen.getByRole('button', {name: 'Clear shopping cart'}));
        expect(screen.queryByRole("table")).not.toBeInTheDocument();

    })

    it('Если корзина пустая, должна отображаться ссылка на каталог товаров:', () => {
        const initState = {
            cart: {}
        }
        const store = createStore(()=>initState)

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Cart />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.queryByRole('link', {name: 'catalog'})).toHaveAttribute('href', '/catalog')
    })
});