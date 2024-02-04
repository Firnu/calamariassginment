import React from "react"
import "./App.scss";
import { Provider } from "react-redux";
import { DoctorsPage } from "./pages/doctors/DoctorsPage";
import { store } from "./redux/store";

export const App = () => {
    return <>
        <Provider store={store}>
            <div className="container">
                <DoctorsPage />
            </div>
        </Provider>
    </>
}