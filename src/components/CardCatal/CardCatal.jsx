import PropTypes from 'prop-types';
import './CardCatal.scss';
import { useNavigate } from 'react-router-dom';

const CardCatal = ({ data }) => {
    const { title, category, image, price, id } = data;
    const navigate = useNavigate();

    return (
        <div className={'card'} onClick={() => navigate(`/${category}/${id}`)}>
            <div className={'card_img'}>
                <img className={'card_img'} src={image} alt="card_img" />
            </div>
            <div className={'card_info'}>
                <div className="card_info_title">{title}</div>
                <div className="card_info_cat">{category}</div>
            </div>
            <div className="card_footer">
                <div className={'card_price'}>{price}$</div>
            </div>
        </div>
    );
};

CardCatal.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
    }).isRequired,
};

export default CardCatal;
