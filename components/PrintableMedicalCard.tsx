"use client";

import React, { useRef } from "react";
import { Button } from "@nextui-org/react";
import { PrinterIcon, ScissorsIcon } from "@heroicons/react/24/outline";
import QRCodeReact from "react-qr-code";

interface PrintableMedicalCardProps {
  url: string;
  firstName?: string;
  lastName?: string;
}

const PrintableMedicalCard: React.FC<PrintableMedicalCardProps> = ({ 
  url,
  firstName = "",
  lastName = "" 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Ensure URL is absolute
  const absoluteUrl = url.startsWith('http') ? url : `https://www.doctqr.link${url.startsWith('/') ? '' : '/'}${url}`;
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the medical card');
      return;
    }
    
    // Get user initials if names are provided
    const initials = firstName && lastName 
      ? `${firstName.charAt(0)}${lastName.charAt(0)}`
      : "";
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>DoctQR - Emergency Medical Card</title>
          <style>
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              .page {
                width: 8.5in;
                height: 11in;
                position: relative;
                padding: 0.5in;
                box-sizing: border-box;
              }
              .instructions {
                margin-bottom: 20px;
                font-family: Arial, sans-serif;
              }
              .card-container {
                width: 3.375in;
                height: 2.125in;
                margin: 0 auto;
                position: relative;
                border: 1px dashed #ccc;
                padding: 5px;
              }
              .card {
                width: 3.375in;
                height: 2.125in;
                background-color: #FF0000;
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                box-sizing: border-box;
                position: relative;
                overflow: hidden;
              }
              .med-info {
                font-size: 42px;
                font-weight: bold;
                font-family: Arial, sans-serif;
                line-height: 1;
                padding-left: 15px;
              }
              .qr-container {
                background: white;
                padding: 10px;
                margin-right: 15px;
                width: 150px;
                height: 150px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .qr-image {
                width: 150px;
                height: 150px;
              }
              .corner {
                position: absolute;
                width: 25px;
                height: 25px;
                border: 5px solid white;
              }
              .top-left {
                top: 10px;
                left: 10px;
                border-right: none;
                border-bottom: none;
              }
              .top-right {
                top: 10px;
                right: 10px;
                border-left: none;
                border-bottom: none;
              }
              .bottom-left {
                bottom: 10px;
                left: 10px;
                border-right: none;
                border-top: none;
              }
              .bottom-right {
                bottom: 10px;
                right: 10px;
                border-left: none;
                border-top: none;
              }
              .initials {
                position: absolute;
                right: 10px;
                bottom: 5px;
                font-size: 10px;
                color: rgba(255, 255, 255, 0.6);
              }
              .no-print {
                display: none;
              }
              .cutting-lines {
                border: 1px dashed #333;
                margin: 10px;
              }
            }
            @media screen {
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background: #f5f5f5;
              }
              .page {
                background: white;
                width: 8.5in;
                height: auto;
                margin: 0 auto;
                padding: 0.5in;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
              }
              .instructions {
                margin-bottom: 20px;
                max-width: 600px;
              }
              .card-container {
                width: 3.375in;
                height: 2.125in;
                margin: 0 auto;
                position: relative;
                border: 1px dashed #ccc;
                padding: 5px;
              }
              .card {
                width: 3.375in;
                height: 2.125in;
                background-color: #FF0000;
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                box-sizing: border-box;
                position: relative;
                overflow: hidden;
              }
              .med-info {
                font-size: 42px;
                font-weight: bold;
                line-height: 1;
                padding-left: 15px;
              }
              .qr-container {
                background: white;
                padding: 10px;
                margin-right: 15px;
                width: 150px;
                height: 150px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .qr-image {
                width: 150px;
                height: 150px;
              }
              .corner {
                position: absolute;
                width: 25px;
                height: 25px;
                border: 5px solid white;
              }
              .top-left {
                top: 10px;
                left: 10px;
                border-right: none;
                border-bottom: none;
              }
              .top-right {
                top: 10px;
                right: 10px;
                border-left: none;
                border-bottom: none;
              }
              .bottom-left {
                bottom: 10px;
                left: 10px;
                border-right: none;
                border-top: none;
              }
              .bottom-right {
                bottom: 10px;
                right: 10px;
                border-left: none;
                border-top: none;
              }
              .initials {
                position: absolute;
                right: 10px;
                bottom: 5px;
                font-size: 10px;
                color: rgba(255, 255, 255, 0.6);
              }
              button {
                background: #0070f3;
                color: white;
                border: none;
                padding: 10px 20px;
                margin-top: 20px;
                cursor: pointer;
                font-size: 16px;
                border-radius: 5px;
              }
              button:hover {
                background: #0051a8;
              }
              .cutting-lines {
                border: 1px dashed #333;
                margin: 10px;
              }
            }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="instructions">
              <h1>Emergency Medical Information Card</h1>
              <p>Please follow these steps to create your emergency medical card:</p>
              <ol>
                <li>Print this page at 100% scale (no scaling/resizing)</li>
                <li>Carefully cut along the dashed lines</li>
                <li>Fold the card if needed and keep it in your wallet</li>
              </ol>
              <p>When scanned, this QR code will provide access to your critical medical information.</p>
            </div>
            
            <div class="card-container">
              <div class="card">
                <div class="corner top-left"></div>
                <div class="corner top-right"></div>
                <div class="corner bottom-left"></div>
                <div class="corner bottom-right"></div>
                
                <div class="med-info">
                  MED<br>INFO
                </div>
                
                <div class="qr-container">
                  <img 
                    src="data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" shape-rendering="crispEdges" width="150" height="150"><path fill="#ffffff" d="M0 0h37v37H0z"/><path stroke="#000000" d="M4 4.5h7m1 0h1m1 0h3m1 0h2m3 0h1m1 0h1m1 0h1m1 0h3m1 0h7M4 5.5h1m5 0h1m1 0h2m1 0h1m2 0h1m1 0h2m2 0h1m3 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m5 0h3m1 0h1m1 0h1m3 0h1m3 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h1m3 0h1m3 0h1m3 0h1m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h3m1 0h2m1 0h1m3 0h3m6 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h9m1 0h1m9 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M13 11.5h1m1 0h3m3 0h2m1 0h3M5 12.5h1m1 0h1m2 0h3m2 0h1m1 0h2m1 0h1m3 0h1m1 0h1m1 0h2m1 0h5M4 13.5h2m1 0h1m2 0h1m1 0h2m1 0h2m1 0h1m5 0h3m1 0h1m1 0h6M4 14.5h4m3 0h2m1 0h2m2 0h1m3 0h1m2 0h1m2 0h1m1 0h6M5 15.5h1m1 0h3m1 0h2m1 0h1m3 0h1m2 0h1m3 0h1m2 0h1m1 0h1m1 0h4M4 16.5h1m2 0h2m3 0h3m1 0h4m3 0h1m2 0h3m2 0h3m1 0h1M4 17.5h1m2 0h1m1 0h5m5 0h5m3 0h3m1 0h5M5 18.5h1m1 0h2m3 0h1m4 0h2m1 0h2m2 0h1m4 0h7M5 19.5h1m2 0h2m1 0h3m1 0h4m1 0h1m2 0h1m1 0h5m1 0h1m1 0h1M6 20.5h2m3 0h1m1 0h5m4 0h1m2 0h1m3 0h1m3 0h3M4 21.5h1m2 0h3m1 0h2m1 0h1m1 0h1m4 0h1m1 0h1m2 0h3m1 0h1m3 0h1M6 22.5h1m1 0h7m1 0h7m2 0h4m1 0h1m3 0h1M4 23.5h2m4 0h1m3 0h2m2 0h3m4 0h2m2 0h1m5 0h1M4 24.5h1m1 0h2m2 0h4m3 0h2m3 0h1m3 0h1m1 0h1m1 0h1m1 0h3M4 25.5h1m1 0h2m2 0h2m2 0h1m5 0h3m2 0h1m1 0h3m1 0h1m1 0h3M4 26.5h1m2 0h1m5 0h2m1 0h2m1 0h1m1 0h1m2 0h3m3 0h5M4 27.5h2m2 0h4m2 0h5m2 0h1m3 0h2m1 0h3m2 0h3M12 28.5h1m4 0h2m6 0h2m1 0h2m2 0h3M4 29.5h7m1 0h2m3 0h2m1 0h2m2 0h1m1 0h1m1 0h1m2 0h1m1 0h3M4 30.5h1m5 0h1m1 0h4m1 0h1m3 0h3m4 0h1m1 0h2m1 0h3M4 31.5h1m1 0h3m1 0h1m1 0h1m1 0h2m4 0h1m1 0h1m1 0h2m3 0h1m1 0h1m1 0h3M4 32.5h1m1 0h3m1 0h1m3 0h2m1 0h1m1 0h3m2 0h1m3 0h2m3 0h3M4 33.5h1m1 0h3m1 0h1m1 0h1m2 0h1m1 0h2m1 0h1m1 0h1m1 0h1m1 0h2m1 0h1m1 0h5M4 34.5h1m5 0h1m2 0h1m2 0h2m2 0h1m1 0h1m1 0h2m3 0h1m5 0h1M4 35.5h7m1 0h1m2 0h3m2 0h3m1 0h2m2 0h3m1 0h4"/></svg>`)}" 
                    alt="Medical QR Code" 
                    class="qr-image"
                  />
                </div>
                
                ${initials ? `<div class="initials">${initials}</div>` : ''}
              </div>
            </div>
            
            <button class="no-print" onclick="window.print()">Print Medical Card</button>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Auto print if possible
    printWindow.onload = function() {
      // Try to auto-print
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  };
  
  return (
    <div className="flex flex-col items-center mt-6 mb-10">
      <h2 className="text-xl font-bold mb-4">Emergency Medical Card</h2>
      <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
        Print this credit card-sized emergency medical information card to carry in your wallet
      </p>
      
      {/* Card Preview */}
      <div className="relative w-[3.375in] h-[2.125in] mb-8 shadow-md" ref={cardRef}>
        <div className="absolute inset-0 bg-red-600 text-white overflow-hidden flex items-center justify-between p-4">
          {/* Corners */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-white"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-white"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-white"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-white"></div>
          
          {/* Text */}
          <div className="text-4xl font-bold leading-tight pl-4">
            MED<br/>INFO
          </div>
          
          {/* QR Code */}
          <div className="bg-white p-2 mr-2" style={{ width: "130px", height: "130px" }}>
            <QRCodeReact
              value={absoluteUrl}
              size={120}
              level="H"
              bgColor="#FFFFFF"
              fgColor="#000000"
            />
          </div>
          
          {/* Optional: User Initials */}
          {firstName && lastName && (
            <div className="absolute right-2 bottom-1 text-xs text-white/60">
              {firstName.charAt(0)}{lastName.charAt(0)}
            </div>
          )}
        </div>
      </div>
      
      {/* Print Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg w-full max-w-md mb-6">
        <h3 className="font-bold text-blue-800 mb-2 flex items-center">
          <ScissorsIcon className="w-5 h-5 mr-2" />
          Printing Instructions
        </h3>
        <ol className="list-decimal pl-5 text-sm space-y-1 text-blue-900">
          <li>Click the "Print Card" button below</li>
          <li>Print at 100% scale (no size adjustment)</li>
          <li>Cut along the dashed lines carefully</li>
          <li>Keep in your wallet for emergency situations</li>
        </ol>
      </div>
      
      {/* Print Button */}
      <Button
        color="primary"
        size="lg"
        startContent={<PrinterIcon className="w-5 h-5" />}
        onClick={handlePrint}
      >
        Print Medical Card
      </Button>
    </div>
  );
};

export default PrintableMedicalCard;