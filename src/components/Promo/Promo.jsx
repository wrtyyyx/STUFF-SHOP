import './Promo.scss';
import Button from '../Button/Btn.jsx';

const Promo = () => {
    return (
        <>
            <div className={'promo'}>
                <h1 className={'promo_text'}>BIG SALE 20%</h1>

                <div className="promo_info">
                    <div className="promo_info_desc">the bestseller of 2022</div>
                    <h2 className={'promo_info_title'}>
                        LENNON r2d2 <br /> with NVIDIA 5090 TI
                    </h2>
                    <Button text={'Shop now'} />
                </div>
            </div>
        </>
    );
};

export default Promo;
