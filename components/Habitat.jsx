import React from 'react';

const Habitat = (props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-green-900 mb-2">
        {props.nom}
      </h2>
      <p className="text-gray-700">
        {props.description}
      </p>
    </div>
  );
};

export default Habitat;