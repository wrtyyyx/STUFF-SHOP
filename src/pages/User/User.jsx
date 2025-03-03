import { useDispatch, useSelector } from 'react-redux';
import './User.scss';
import Btn from '../../components/Button/Btn.jsx';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../../store/slice/userSlice.js';
import { resetStore, setOrders } from '../../store/slice/storeSlice.js';

const User = () => {
    const userData = useSelector((state) => state.user);
    const userOrders = useSelector((state) => state.store.orders);
    console.log(userData);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fullName = `${userData.firstName} ${userData.lastName}`;
    const history = userOrders.filter((order) => order.user === fullName);
    const deleteUser = () => {
        dispatch(resetUser());
        dispatch(resetStore(userData));
        navigate('/');
    };

    const deleteHistory = () => {
        dispatch(setOrders(userOrders.filter((order) => order.user !== fullName)));
    };

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
            <div className={'user_history user_history_container'}>
                <div className="user_history_title">History of orders</div>
                {history.length ? (
                    <div>
                        <div className="user_history_box">
                            {history.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(`/user/${item.id}`)}
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
