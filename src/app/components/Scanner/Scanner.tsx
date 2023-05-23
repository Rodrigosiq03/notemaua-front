import React from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

function Scanner({
  width,
  height,
  onUpdate,
}: {
  width: number;
  height: number;
  onUpdate: any;
}) {
  return (
    <>
      <BarcodeScannerComponent
        width={width}
        height={height}
        onUpdate={(err, result) => {
          onUpdate(err, result);
        }}
      />
    </>
  );
}

export default Scanner;
