import React, { useState,useRef,useEffect } from "react";

import StripeContainer from '../components';
import './css/logger.css'

const Logger = ({log}) => {
  
  return (
    <div className={'logger_container'}>
      <div className={'logger_frontend'}>
        <div className={'logger_f_component'}></div>
        <div className={'logger_f_request'}></div>
        <div className={'logger_f_parameter'}></div>
      </div>
      <div className={'logger_backend'}>
        <div className={'logger_b_router'}></div>
        <div className={'logger_b_controller'}></div>
        <div className={'logger_b_response'}></div>
      </div>
    </div>
  );
};

export default Logger