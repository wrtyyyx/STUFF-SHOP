import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home.jsx';
import Cart from '../pages/Cart/Cart.jsx';
import CategoryItems from '../pages/CategoryItems/CategoryItems.jsx';
import Product from '../pages/Product/Product.jsx';
import MainLayout from '../tamplate/MainLayout.jsx';
import SignIn from '../pages/SingIn/SignIn.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Delivery from '../pages/Delivery/Delivery.jsx';
import UserHistory from '../pages/User/UserHistory.jsx';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path=":category" element={<CategoryItems />} />
                    <Route path=":category/:id" element={<Product />} />
                    <Route
                        path="cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />
                    <Route path={'/cart/delivery'} element={<Delivery />} />
                    <Route path={'/signIn/:id'} element={<UserHistory />} />
                </Route>
                <Route path="/signIn" element={<SignIn />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
