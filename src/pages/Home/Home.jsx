import { useEffect } from 'react';
import Promo from '../../components/Promo/Promo.jsx';
import './Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setStore } from '../../store/slice/storeSlice.js';

const Home = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.store.products);

    useEffect(() => {
        const allData = JSON.parse(localStorage.getItem('cart'));

        const filteredData = allData?.filter((item) => !cart.some((cartItem) => cartItem.id === item.id));
        if (filteredData?.length > 0) {
            filteredData.forEach((item) => {
                dispatch(setStore(item));
            });
        }
    }, [dispatch, cart]);

    return <Promo />;
};

export default Home;
