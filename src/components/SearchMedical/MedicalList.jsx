import React from 'react';

const Medical = ({ medical }) => (
  <div className="Medical">
    <figure>
      <a href={`/medical/${medical.curp}`}>
        <img src={medical.img.image_base_64} alt="" width="80" />
      </a>
    </figure>
    <div>
      <span>{medical.fullName}</span> {medical.curp}
    </div>
  </div>
);

export const MedicalList = ({ type, dataMedical, inputValue }) => (
  <div className="Medicals">
    {dataMedical.map(medical => {
      if (medical[type].toLowerCase().search(inputValue) > -1) {
        return <Medical key={medical.curp} medical={medical} />;
      }
      return null;
    })}
  </div>
);
