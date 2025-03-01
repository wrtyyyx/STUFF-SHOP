import * as React from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import OrderCard from '../OrderCard/OrderCard.jsx';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../../store/slice/storeSlice.js';

const steps = ['Choose delivery property', 'Confirm order'];

export default function DeliveryStepper() {
    const user = useSelector((state) => state.user);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [address, setAddress] = React.useState(user.address ?? '');
    const [paymentType, setPaymentType] = React.useState('');
    const dispatch = useDispatch();
    const store = useSelector((state) => state.store.products);
    const navigate = useNavigate();

    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        if (address && paymentType) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
    };

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleSubmit = () => {
        dispatch(
            addOrder({
                address: address,
                payBy: paymentType,
                user: user.firstName + ' ' + user.lastName,
                email: user.email,
            })
        );
        setActiveStep(2);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} sx={{ '& .MuiStepIcon-root': { color: 'white' } }}>
                {steps.map((label, index) => (
                    <Step key={label} completed={isStepSkipped(index) ? false : undefined}>
                        <StepLabel
                            sx={{
                                '& .MuiStepLabel-label': { color: '#6c3eb8' },
                                '& .Mui-active': { color: '#6c3eb8' },
                                '& .Mui-completed': { color: '#6c3eb8' },
                            }}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, color: 'white' }}>
                        Thank you for your order, see you later alligator!
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={() => navigate('/')} sx={{ color: 'white', border: '1px solid white' }}>
                            Go to shop
                        </Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, color: 'white' }}>Step {activeStep + 1}</Typography>
                    {activeStep === 0 && (
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                required
                                label="Delivery Address"
                                variant="outlined"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                sx={{
                                    mb: 2,
                                    input: { color: 'white' },
                                    label: { color: 'white' },
                                    fieldset: { borderColor: 'white' },
                                }}
                            />
                            <TextField
                                select
                                required
                                fullWidth
                                label="Payment Type"
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                                sx={{
                                    input: { color: '#fff' },
                                    label: { color: '#fff' },
                                    fieldset: { borderColor: '#fff' },
                                }}
                            >
                                <MenuItem value="card">Credit Card</MenuItem>
                                <MenuItem value="cash">Cash on Delivery</MenuItem>
                            </TextField>
                        </Box>
                    )}
                    {activeStep === 1 && (
                        <Box>
                            <Typography sx={{ mb: 2, color: 'white' }}>Confirm your order</Typography>
                            {store.map((item) => (
                                <OrderCard key={item.id} product={item} />
                            ))}
                            Total price: <span>{store.reduce((acc, item) => acc + item.price, 0)} $</span>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {activeStep === 0 ? (
                            <Button color="error" onClick={() => navigate(-1)}>
                                Back to cart
                            </Button>
                        ) : (
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1, color: 'white', border: '1px solid white' }}
                            >
                                Back
                            </Button>
                        )}

                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                            onClick={activeStep === 1 ? handleSubmit : handleNext}
                            sx={{
                                color: 'white',
                                border: '1px solid white',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                            }}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
