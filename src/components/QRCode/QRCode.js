"use client";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCode = () => {
  return (
    <div className="min-h-96 p-10 flex flex-col justify-center items-center">
      <h1>Blaze Gym Fitness QR Code</h1>
      <div className="bg-white p-4 mt-5 shadow-lg rounded-lg">
        <QRCodeCanvas value="https://www.blazegymfitness.fit/" size={200} />
      </div>
    </div>
  );
};

export default QRCode;
