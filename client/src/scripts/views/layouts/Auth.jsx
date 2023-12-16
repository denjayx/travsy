import React from 'react';
import { Outlet, useOutletContext, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import Logo from '../../../assets/logo.svg';

const Auth = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    // Add your close logic here
    navigate('/');
  };

  return (
    <section className="container flex h-screen items-center justify-center text-primary-950 max-xl:mt-24">
      <div className="items-center justify-center space-y-4 rounded-3xl bg-white p-12 md:w-8/12 lg:w-6/12">
        <div className="flex justify-between items-start mb-4">
          {/* Your image */}
          <div>
            <img src={Logo} alt="Logo" />
          </div>
          {/* Close icon */}
          <AiOutlineClose
            onClick={handleCancel}
            className="cursor-pointer text-xl font-bold text-primary-500 w-6 h-6  "
            aria-label="Cancel login"
          />
        </div>
        <Outlet context={useOutletContext()} />
      </div>
    </section>
  );
};

export default Auth;
