import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { Home } from 'home';
import { ListWord } from 'listWord';
import { Login } from 'login';
import { SaveWord } from 'word';
import { Nav, PrivateRoute } from '_components';
import { history } from '_helpers';

export { App };

function App() {
    // init custom history object to allow navigation from
    // anywhere in the react app (inside or outside components)
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container bg-light">
            <Nav />
            <div className="container pt-4 pb-4">
                <Routes>
                <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                  <Route path="/login" element={<Login />} />
                  <Route path="/saveWord" element={<SaveWord />} />
                  <Route path="/listWord" element={<ListWord />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}
