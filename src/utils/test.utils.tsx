import { AppStore, AppRootState } from '../redux/store';
import { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import { testDoctorsState, testStore } from './test.data';
import { configureStore } from "@reduxjs/toolkit";
import doctorSlice from '../redux/doctors/doctor.slice';

interface ProviderOptions {
    preloadedState?: AppRootState
    store?: AppStore
}

interface ExtendedRenderOptions
    extends Omit<RenderOptions, 'queries'>, ProviderOptions { }

export function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={testStore}>{children}</Provider>
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {
            doctors: testDoctorsState,
        },
        store = configureStore({
            reducer: { doctors: doctorSlice },
            preloadedState: preloadedState,
        }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function ProviderWrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }

    return { store, ...render(ui, { wrapper: ProviderWrapper, ...renderOptions }) }
}