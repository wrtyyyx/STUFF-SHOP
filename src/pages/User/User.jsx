import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './User.scss';
import Btn from '../../components/Button/Btn.jsx';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../../store/slice/userSlice.js';
import { resetStore, setOrders } from '../../store/slice/storeSlice.js';

const User = () => {
    const userData = useSelector((state) => state.user);
    const userOrders = useSelector((state) => state.store.orders);
    const [history, setHistory] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deleteUser = () => {
        dispatch(resetUser());
        dispatch(resetStore());
        navigate('/');
    };

    const deleteHistory = () => {
        const filterOrders = userOrders.filter((item) => item.user !== userData.firstName + ' ' + userData.lastName);
        setHistory(filterOrders.filter((item) => item.user === userData.firstName + ' ' + userData.lastName));
        dispatch(setOrders(filterOrders));
    };
    useEffect(() => {
        const filterOrders = userOrders.filter((item) => item.user === userData.firstName + ' ' + userData.lastName);
        setHistory(filterOrders);
    }, [userOrders]);
    return (
        <section className={'user'}>
            <div className="container user_container">
                <div className="user_info">
                    <div className="user_name">
                        <div className="user_name_last">{userData.lastName}</div>
                        <div className="user_name_first">{userData.firstName}</div>
                    </div>

                    <div className="user_phone">Phone number: {userData.phone}</div>
                    <div className="user_email">Email: {userData.email}</div>
                    <div className="user_address">Address: {userData.address}</div>
                    <Btn text={'Delete user'} func={deleteUser} />
                </div>
            </div>
            <div className={'user_history'}>
                <div className="user_history_title">History of orders</div>
                {history.length ? (
                    <div>
                        <div className="user_history_box">
                            {history.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/signIn/${item.id}`)}
                                    className={'user_history_card'}
                                >
                                    <div className="user_history_card_date">Date: {item.date}</div>
                                    <div className="user_history_card_total">Total: {item.total}$</div>
                                    <div className="user_history_card_pay">Pay by: {item.payBy}</div>
                                    <div className="user_history_card_user">
                                        User: <span>{item.user}</span>{' '}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Btn text={'Delete history'} func={deleteHistory} />
                    </div>
                ) : (
                    <p>No orders</p>
                )}
            </div>
        </section>
    );
};

export default User;
