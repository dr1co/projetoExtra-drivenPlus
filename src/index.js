import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './assets/css/reset.css';

function App() {
    return (
        <BrowserRouter>
        Hello World!
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.querySelector(".root"));