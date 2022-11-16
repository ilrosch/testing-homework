import {it, describe, expect} from '@jest/globals'
import {render, screen } from "@testing-library/react";
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

const basename = '/'


describe('Тестируем каталог', () => {
    it('В каталоге должны отображаться товары: ', () => {
        const initState = {
            cart: {},
            products: [
                { id: 1, name: "order_1", price: 100 },
                { id: 2, name: "order_2", price: 20 },
            ]
        }
        const store = createStore(() => initState);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.queryByRole('heading', {name: 'order_1'})).toBeInTheDocument()
        expect(screen.queryByRole('heading', {name: 'order_2'})).toBeInTheDocument()
    });

    it('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре: ', () => {
        const initState = {
            cart: {},
            products: [
                { id: 1, name: "order_1", price: 100 },
                { id: 2, name: "order_2", price: 20 },
            ]
        }
        const store = createStore(() => initState);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.queryByRole('heading', {name: 'order_1'})).toBeInTheDocument()
        expect(screen.queryByText('$100')).toBeInTheDocument()

        expect(screen.queryByRole('heading', {name: 'order_2'})).toBeInTheDocument()
        expect(screen.queryByText('$20')).toBeInTheDocument()

        expect(screen.queryAllByRole('link', {name: /Details/i})).toHaveLength(2)
    });

    it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину": ', () => {
        const initState = {
            cart: {},
            products: [
                { id: 1, name: "order_1", price: 100 },
                { id: 2, name: "order_2", price: 20 },
            ],
            details: {
                1: {
                    id: 1,
                    name: "order_1",
                    price: 100,
                    description: "Описание товара: order_1",
                    material: "материал: order_1",
                    color: "цвет: order_1",
                },
                2: {
                    id: 2,
                    name: "order_2",
                    price: 20,
                    description: "Описание товара: order_2",
                    material: "материал: order_2",
                    color: "цвет: order_2",
                }
            }
        }
        const store = createStore(() => initState);

        render(
            <MemoryRouter initialEntries={['/catalog/1']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.queryByRole('heading', {name: 'order_1'})).toBeInTheDocument()
        expect(screen.queryByText('$100')).toBeInTheDocument()
        expect(screen.queryByText('Описание товара: order_1')).toBeInTheDocument()
        expect(screen.queryByText('материал: order_1')).toBeInTheDocument()
        expect(screen.queryByText('цвет: order_1')).toBeInTheDocument()
        expect(screen.queryByText('Add to Cart')).toBeInTheDocument()

        render(
            <MemoryRouter initialEntries={['/catalog/2']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        expect(screen.queryByRole('heading', {name: 'order_2'})).toBeInTheDocument()
        expect(screen.queryByText('$20')).toBeInTheDocument()
        expect(screen.queryByText('Описание товара: order_2')).toBeInTheDocument()
        expect(screen.queryByText('материал: order_2')).toBeInTheDocument()
        expect(screen.queryByText('цвет: order_2')).toBeInTheDocument()
    });

    it('Если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом: ', () => {
        const initState = {
            cart: {1:{}},
            products: [
                { id: 1, name: "order_1", price: 100 }
            ],
            details: {
                1: {
                    id: 1,
                    name: "order_1",
                    price: 100,
                    description: "Описание товара: order_1",
                    material: "материал: order_1",
                    color: "цвет: order_1",
                },
            }
        }
        const store = createStore(() => initState);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.queryByText('Item in cart')).toBeInTheDocument()
    });

    it('Если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество: ', () => {

    });

    it('Содержимое корзины должно сохраняться между перезагрузками страницы: ', () => {

    });
});