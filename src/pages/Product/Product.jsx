import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetItemQuery } from '../../store/api/itemsApi.js';
import './Product.scss';
import { Rating } from '@mui/material';
import Btn from '../../components/Button/Btn.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setStore } from '../../store/slice/storeSlice.js';
import { Modal } from 'react-bootstrap';

const Product = () => {
    const { id } = useParams();
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const store = useSelector((state) => state.store.products);
    const user = useSelector((state) => state.user);

    const { data: product, isLoading } = useGetItemQuery(id);
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>No product</p>;
    }
    const addToFavorite = () => {};
    const addToCart = () => {
        if (user.firstName === '') {
            navigation('/signin');
            return;
        }
        const existProduct = store.find((item) => item.id === product.id);
        if (existProduct) {
            dispatch(setStore({ ...existProduct, quantity: existProduct.quantity + 1 }));
        } else {
            dispatch(setStore({ ...product }));
        }
        setShow(true);
        localStorage.setItem('cart', JSON.stringify([...store, { ...product }]));

        console.log('product added');
    };

    return (
        <section className={'product'}>
            <div className="product_back" onClick={() => navigation(-1)}>
                Go back
            </div>
            <div className="container product_container">
                <div className={'product_left'}>
                    <img className={'product_img'} src={product.image} alt="Product_Img" width={380} height={380} />
                </div>
                <div className={'product_right'}>
                    <div className="product_title">{product.title}</div>
                    <div className={'product_price'}>{product.price} $</div>
                    <div className="product_rate">
                        <Rating
                            name="read-only"
                            sx={{
                                '& .MuiRating-iconEmpty': {
                                    color: 'white',
                                },
                            }}
                            value={product.rating.rate}
                            precision={0.1}
                            readOnly
                        />
                        <div className={'product_rate_value'}>{product.rating.rate}</div>
                    </div>
                    <div className={'product_count'}>Count: {product.rating.count} items</div>
                    <div className={'product_desc'}>{product.description}</div>
                    <div className={'product_group'}>
                        <Btn text={'Add to cart'} func={addToCart} />
                        <Btn text={'Add to favorites'} func={addToFavorite} grey />
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={() => setShow(false)} style={{ color: 'black' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Congratulation!🥳</Modal.Title>
                </Modal.Header>
                <Modal.Body>You successful added item to cart</Modal.Body>
                <Modal.Footer>Go to cart?</Modal.Footer>
                <Modal.Footer>
                    <Btn grey text={'Return to buy'} func={() => setShow(false)} />
                    <Btn text={'Go to cart'} func={() => navigation('/cart')} />
                </Modal.Footer>
            </Modal>
        </section>
    );
};

export default Product;
