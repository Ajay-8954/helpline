import React, { useState , useEffect} from 'react';
import PhoneNumberForm from './components/PhoneNumberForm';
import OtpVerificationForm from './components/OtpVerificationForm';
import ContactAdditionForm from './components/ContactAddition';
import SendLocation from './components/SendLocation';
import axios from 'axios';


const App = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);

    // Load step from localStorage when the component mounts
  

  const handlePhoneSubmit = (phone) => {
    setPhoneNumber(phone);  // Store the entered phone number
    setStep(2);  // Move to the OTP step
  };

  const handleOtpSubmit = async (otp) => {
    try {
      const response = await axios.post('http://localhost:4000/api/verify', { otp });
      if (response.data.message === 'OTP verified successfully') {
        setIsVerified(true);
        setStep(3);  // Move to the contact addition step
      } else {
        alert('Incorrect OTP. Please try again.');
      }
    } catch (error) {
      alert('Error verifying OTP. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {step === 1 && <PhoneNumberForm onPhoneSubmit={handlePhoneSubmit} />}
      {step === 2 && <OtpVerificationForm onOtpSubmit={handleOtpSubmit} />}
      {step === 3 && isVerified && (
        <>
          <ContactAdditionForm />
          <SendLocation />
        </>
      )}
    </div>
  );
};

export default App;
