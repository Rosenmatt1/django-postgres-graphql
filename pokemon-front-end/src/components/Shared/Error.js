import React, { useState, useEffect } from 'react';
import '../../App.css';


function Error({error}) {
  return (
        <div className="error">
            {error}
        </div>
  );
}

export default Error;