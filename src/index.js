import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Pages/Login/login';
import Album from './Pages/Album/album';
import './styles.css'
import reportWebVitals from './reportWebVitals';
import { 
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import { PrivateRoute } from './Routes/privateRoute';
import { InfoContextLogin } from './Context/contextLogin';
import Artist from './Pages/Artist/artist';
import MyAlbum from './Pages/MyAlbum/myAlbum';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <InfoContextLogin>
                <Routes>
                    <Route path='/login' exact element={<Login/>}/>
                    <Route path='/' exact element={<PrivateRoute> <Album/> </PrivateRoute>}> </Route>
                    <Route path='/artist/:id' exact element={<PrivateRoute> <Artist/> </PrivateRoute>}></Route>
                    <Route path='/myAlbum' exact element={<PrivateRoute> <MyAlbum/> </PrivateRoute>}></Route>
                </Routes>
            </InfoContextLogin>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
