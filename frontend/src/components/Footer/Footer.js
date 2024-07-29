import React from 'react';

const Footer = () => {
    return (
        <footer className='w-100' style={
            {
                backdropFilter: 'blur(5px)',
                borderTop: '1px dashed white',
                boxShadow: '0 0 20px 0 blue',
                padding: '1rem 0',
            }
        }>
            <div className="container w-100">
                <div className="row">
                    <div className="col-lg-6 col-md-6 text-center">
                        <h3>Our Address</h3>
                        <p>123, Main Street, Your City</p>
                        <p>1234567890</p>
                        <p><a className='text-info text-decoration-none' href="mailto:salmanmehmood19j@gmail.com">Send a Mail</a></p>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <p className="text-center">All rights reserved</p>
                        <p className="text-center">Made by Salman</p>
                        <p className="text-center">Year in 2024</p>
                        <p className='text-center'>Copyright &copy;</p>
                        {/* copyrigth symbol */}
                    </div>
                    
                </div>

            </div>
        </footer>
    );
};

export default Footer;