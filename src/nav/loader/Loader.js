import React from 'react';
import LoadingImg from '../../images/YUMMIpizza.svg';

function Loader() {
    return ( 
        <div className="col-lg-12 col-12">
            <img className="fa-spin" src={LoadingImg} width="250" height="250" alt="loader" />
            <h3 >Loading YUMMI content..</h3>
        </div>
    );
}
export default Loader;