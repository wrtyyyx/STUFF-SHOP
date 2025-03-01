import Header from '../../components/Header/Header.jsx';
import './SignIn.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/slice/userSlice.js';
import { useNavigate } from 'react-router-dom';
import User from '../User/User.jsx';
import GradientText from '../../blocks/TextAnimations/GradientText/GradientText.jsx';
import { PhoneInput } from 'react-international-phone';

const SignIn = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues: user, mode: 'onBlur' });

    const onSubmit = (data) => {
        dispatch(setUser(data));
        sessionStorage.setItem('userData', JSON.stringify(data));
        navigate('/');
    };

    return (
        <>
            <Header />
            <section className="sign">
                <div className="container sign_container">
                    {user?.firstName ? (
                        <User />
                    ) : (
                        <>
                            <h1 className={'sign_title'}>
                                <GradientText
                                    colors={['#4ff9bb', '#c25ccc', '#5200da']}
                                    animationSpeed={3}
                                    showBorder={false}
                                    className="custom-class"
                                >
                                    Create user!
                                </GradientText>
                            </h1>
                            <hr />
                            <form className="sign_form" onSubmit={handleSubmit(onSubmit)}>
                                <div className={'sign_row'}>
                                    <div className="sign_group">
                                        <label>Enter First Name</label>
                                        <input
                                            {...register('firstName', { required: 'Enter your first name!' })}
                                            type="text"
                                            placeholder={'First name...'}
                                        />
                                        {errors.firstName && <p className="sign_error">{errors.firstName.message}</p>}
                                    </div>

                                    <div className="sign_group">
                                        <label>Enter Last Name</label>
                                        <input
                                            {...register('lastName', { required: 'Enter your last name!' })}
                                            type="text"
                                            placeholder={'Last name...'}
                                        />
                                        {errors.lastName && <p className="sign_error">{errors.lastName.message}</p>}
                                    </div>
                                </div>

                                <div className="sign_row">
                                    <div className="sign_group">
                                        <label>Enter Email</label>
                                        <input
                                            {...register('email', { required: 'Enter your email!' })}
                                            type="email"
                                            placeholder={'Email...'}
                                        />
                                        {errors.email && <p className="sign_error">{errors.email.message}</p>}
                                    </div>

                                    <div className="sign_group">
                                        <label>Enter Phone Number</label>
                                        <PhoneInput
                                            defaultCountry="ua"
                                            placeholder="Enter phone number"
                                            className={'react-international-phone'}
                                            value={watch('phone')}
                                            inputProps={{}}
                                            onChange={(value) => setValue('phone', value, { shouldValidate: true })}
                                        />
                                        {errors.phone && <p className="sign_error">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div className="sign_group">
                                    <label>Enter Address</label>
                                    <input
                                        {...register('address', { required: 'Enter your address!' })}
                                        type="text"
                                        placeholder={'Address...'}
                                    />
                                    {errors.address && <p className="sign_error">{errors.address.message}</p>}
                                </div>

                                <button type="submit" className="sign_button">
                                    Submit
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default SignIn;
