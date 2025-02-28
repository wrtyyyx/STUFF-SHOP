import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './UserHistory.scss';
import OrderCard from '../../components/OrderCard/OrderCard.jsx';

const UserHistory = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const userOrders = useSelector((state) => state.store.orders);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const searchOrder = userOrders.find((item) => item.id === id);
            console.log(searchOrder);
            if (searchOrder) {
                setOrder(searchOrder);
            }
        }
    }, [id, userOrders]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <section className={'history'}>
            <div className="container history_container">
                <div onClick={() => navigate(-1)} className="history_back">
                    Go back
                </div>
                <div className="history_title">Order for: {order.date} </div>
                <hr />
                <div className="history_info">
                    <div>
                        User: <span>{order.user}</span>
                    </div>
                    <div>Pay by: {order.payBy}</div>
                    <div>Order total: {order.total} $</div>
                    <div>Address for delivery:{order.address}</div>
                </div>
                <div className="histroy_box">
                    <div className="history_order">Order:</div>
                    <hr />
                    {order.products &&
                        order.products.map((product) => <OrderCard key={product.id} product={product} />)}
                </div>
            </div>
        </section>
    );
};

export default UserHistory;
