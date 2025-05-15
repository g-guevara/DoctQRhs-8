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
    
    // Generate QR code data URL - this is the key fix
    const qrCodeElement = document.createElement('div');
    
    // Render QR code to a temporary element
    const tempQrRoot = document.createElement('div');
    document.body.appendChild(tempQrRoot);
    
    // Use react-dom to render our QR code component
    import('react-dom/client').then((ReactDOM) => {
      const root = ReactDOM.createRoot(tempQrRoot);
      root.render(
        <QRCodeReact
          value={absoluteUrl}
          size={150}
          level="H"
          bgColor="#FFFFFF"
          fgColor="#000000"
        />
      );
      
      // Wait for the QR code to render
      setTimeout(() => {
        // Convert the rendered SVG to data URL
        const svg = tempQrRoot.querySelector('svg');
        if (svg) {
          const svgData = new XMLSerializer().serializeToString(svg);
          const svgDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
          
          // Now write the print window with the QR code
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>DoctQR - Emergency Medical Card</title>
                <style>
                  /* Critical: Force background colors to print */
                  * {
                    -webkit-print-color-adjust: exact !important;   /* Chrome, Safari 6 – 15.3, Edge */
                    color-adjust: exact !important;                 /* Firefox 48 – 96 */
                    print-color-adjust: exact !important;           /* Firefox 97+, Safari 15.4+ */
                  }
                  
                  @page {
                    size: letter;
                    margin: 0.5in;
                  }
                  
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
                      background-color: #FF0000 !important; /* Force red background */
                      color: white !important;
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
                      color: white !important;
                    }
                    .qr-container {
                      background: white !important;
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
                      border: 5px solid white !important;
                    }
                    .top-left {
                      top: 10px;
                      left: 10px;
                      border-right: none !important;
                      border-bottom: none !important;
                    }
                    .top-right {
                      top: 10px;
                      right: 10px;
                      border-left: none !important;
                      border-bottom: none !important;
                    }
                    .bottom-left {
                      bottom: 10px;
                      left: 10px;
                      border-right: none !important;
                      border-top: none !important;
                    }
                    .bottom-right {
                      bottom: 10px;
                      right: 10px;
                      border-left: none !important;
                      border-top: none !important;
                    }
                    .initials {
                      position: absolute;
                      right: 10px;
                      bottom: 5px;
                      font-size: 10px;
                      color: rgba(255, 255, 255, 0.6) !important;
                    }
                    .no-print {
                      display: none;
                    }
                    .cutting-lines {
                      border: 1px dashed #333;
                      margin: 10px;
                    }
                    .print-note {
                      background-color: #f8f9fa !important;
                      border: 1px solid #ddd !important;
                      padding: 10px !important;
                      margin-bottom: 20px !important;
                      font-family: Arial, sans-serif !important;
                      font-size: 14px !important;
                      color: #333 !important;
                    }
                    .print-note strong {
                      color: #d00 !important;
                      font-weight: bold !important;
                    }
                    .url-info {
                      font-size: 8px;
                      opacity: 0.8;
                      position: absolute;
                      bottom: 20px;
                      right: 10px;
                      text-align: right;
                      color: white !important;
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
                    .url-info {
                      font-size: 8px;
                      opacity: 0.8;
                      position: absolute;
                      bottom: 20px;
                      right: 10px;
                      text-align: right;
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
                    .print-note {
                      background-color: #f8f9fa;
                      border: 1px solid #ddd;
                      padding: 10px;
                      margin-bottom: 20px;
                      font-family: Arial, sans-serif;
                      font-size: 14px;
                    }
                    .print-note strong {
                      color: #d00;
                      font-weight: bold;
                    }
                  }
                </style>
              </head>
              <body>
                <div class="page">
                  <div class="print-note">
                    <strong>IMPORTANT:</strong> Please make sure Background graphics or Print backgrounds is enabled in your print settings to get the red background color. This setting is usually found under "More settings" in the print dialog.
                  </div>
                  
                  <div class="instructions">
                    <h1>Emergency Medical Information Card</h1>
                    <p>Please follow these steps to create your emergency medical card:</p>
                    <ol>
                      <li>Print this page at 100% scale (no scaling/resizing)</li>
                      <li>Make sure Background graphics is enabled in your print settings</li>
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
                          src="${svgDataUrl}" 
                          alt="Medical QR Code" 
                          class="qr-image"
                        />
                      </div>
                      
                      ${initials ? `<div class="initials">${initials}</div>` : ''}
                      <div class="url-info">doctqr.link</div>
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
          
          // Clean up
          document.body.removeChild(tempQrRoot);
        }
      }, 100);
    });
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
          <div className="absolute bottom-5 right-2 text-xs opacity-70">doctqr.link</div>
        </div>
      </div>
      
      {/* Print Instructions with Background Warning */}
      <div className="bg-blue-50 p-4 rounded-lg w-full max-w-md mb-6">
        <h3 className="font-bold text-blue-800 mb-2 flex items-center">
          <PrinterIcon className="w-5 h-5 mr-2" />
          Printing Instructions
        </h3>
        <ol className="list-decimal pl-5 text-sm space-y-1 text-blue-900">
          <li>Click the Print Card button below</li>
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