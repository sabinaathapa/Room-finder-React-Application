import React, { useState } from "react";
import OwnerHeader from "../../components/headerfooter/OwnerHeader";
import Footer from "../../components/headerfooter/Footer";
import OwnerRoom from "../../components/OwnerRoom";

const CreateRoomForm = ()=>{
    return <>
        <OwnerHeader/>
          <OwnerRoom/>
        <Footer/>
    </>
}

export default CreateRoomForm;
