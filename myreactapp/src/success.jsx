import React from 'react';
import BaseLayout from './components/BaseLayout/baselayout';


const Success = () => {
    return (
    <>
    <BaseLayout/>
    <h3>Success</h3>
    </>
    );
};

export default Success;

/*const DisplayProfile = async() => {

    try {
        await axios.get(`${API_BASE_URL}success/`);
        console.log('Success Page');
      } catch (error) {
      console.error('Error:', error.response.data.error);
    }
  return (
    <h1>Success Page</h1>
  );
};

export default DisplayProfile;
*/











