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
    
    // Write the print window with optimized HTML & CSS
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>DoctQR - Emergency Medical Card</title>
          <style>
            /* CRITICAL FIX: Force background colors and other styles to print */
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
              box-sizing: border-box;
            }
            
            @page {
              size: auto;
              margin: 0mm;
            }
            
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            
            .card-container {
              width: 3.375in;
              height: 2.125in;
              margin: 0 auto;
              padding: 10px;
              border: 1px dashed #aaa;
            }
            
            .card {
              width: 100%;
              height: 100%;
              background-color: #FF0000 !important;
              color: white !important;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 10px;
              position: relative;
              box-shadow: 0 1px 3px rgba(0,0,0,0.12);
              overflow: hidden;
            }
            
            .med-info {
              font-size: 36px; /* Smaller font size, was 42px */
              font-weight: bold;
              font-family: Arial, sans-serif;
              line-height: 1;
              padding-left: 15px;
              color: white !important;
            }
            
            .qr-container {
              background: white !important;
              padding: 8px;
              margin-right: 15px;
              border: 1px solid #ddd;
              height: 150px;
              width: 150px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            
            .corner {
              position: absolute;
              width: 20px;
              height: 20px;
              border: 3px solid white !important;
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
            
            .person-name {
              position: absolute;
              left: 25px; /* Match with MED INFO padding-left */
              bottom: 25px;
              font-size: 10px;
              font-weight: bold;
              color: #FF0000 !important;
              background-color: white !important;
              padding: 2px 5px;
              border-radius: 2px;
              max-width: 120px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            
            .initials {
              position: absolute;
              right: 10px;
              bottom: 5px;
              font-size: 10px;
              color: rgba(255, 255, 255, 0.7) !important;
            }
            
            .url-info {
              display: none; /* Hide this element */
            }
            
            .print-instructions {
              max-width: 500px;
              margin: 0 auto 30px auto;
              padding: 15px;
              background: #f8f9fa;
              border: 1px solid #ddd;
              border-radius: 5px;
            }
            
            .print-instructions h2 {
              margin-top: 0;
              font-size: 18px;
            }
            
            .print-instructions ol {
              margin-bottom: 0;
              padding-left: 20px;
            }
            
            .print-instructions li {
              margin-bottom: 8px;
            }
            
            .print-instructions strong {
              color: #d00;
            }
            
            .print-button {
              display: block;
              margin: 20px auto;
              padding: 10px 20px;
              background: #0070f3;
              color: white;
              border: none;
              border-radius: 5px;
              font-size: 16px;
              cursor: pointer;
            }
            
            @media print {
              .print-instructions, .print-button {
                display: none;
              }
              
              body {
                padding: 0;
              }
              
              .card-container {
                border: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-instructions">
            <h2>Printing Instructions</h2>
            <ol>
              <li><strong>Important:</strong> Enable Background graphics in your print settings</li>
              <li>Select Actual size or 100% in print scale</li>
              <li>After printing, cut carefully along the card edges</li>
              <li>Fold if needed and keep in your wallet</li>
            </ol>
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
                <div id="qr-placeholder" style="width: 140px; height: 140px;"></div>
              </div>
              
              ${firstName && lastName ? `<div class="person-name">${firstName} ${lastName}</div>` : ''}
              ${initials ? `<div class="initials">${initials}</div>` : ''}
            </div>
          </div>
          
          <button class="print-button" onclick="window.print(); return false;">
            Print Medical Card
          </button>

          <script>
            // We'll inject the QR code SVG directly
            const qrContainer = document.getElementById('qr-placeholder');
            
            // Function to create QR code SVG
            function createQR() {
              const qrSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
              qrSvg.setAttribute('width', '140');
              qrSvg.setAttribute('height', '140');
              qrSvg.setAttribute('viewBox', '0 0 256 256');
              
              // Add QR code data - this will just create a placeholder for demonstration
              // We'd need a QR code generator library to do this properly
              const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
              rect.setAttribute('width', '256');
              rect.setAttribute('height', '256');
              rect.setAttribute('fill', 'white');
              qrSvg.appendChild(rect);
              
              // Add a simple pattern to demonstrate (this isn't an actual QR code)
              for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                  if ((i + j) % 2 === 0 || (i === 0 && j === 0) || (i === 0 && j === 7) || (i === 7 && j === 0)) {
                    const block = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    block.setAttribute('x', (i * 32).toString());
                    block.setAttribute('y', (j * 32).toString());
                    block.setAttribute('width', '32');
                    block.setAttribute('height', '32');
                    block.setAttribute('fill', 'black');
                    qrSvg.appendChild(block);
                  }
                }
              }
              
              return qrSvg;
            }
            
            // Add a better approach - create an image with actual QR code
            const img = document.createElement('img');
            img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(absoluteUrl)}';
            img.alt = 'Medical Information QR Code';
            img.style.width = '140px';
            img.style.height = '140px';
            
            // Add the image to the container
            qrContainer.appendChild(img);
            
            // Auto-print on load (after a slight delay to ensure rendering)
            window.addEventListener('load', function() {
              setTimeout(function() {
                // Uncomment the next line if you want auto-printing
                // window.print();
              }, 1000);
            });
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
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
          <div className="text-3xl font-bold leading-tight pl-4">
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
          
          {/* Person's Name */}
          {firstName && lastName && (
            <div className="absolute left-6 bottom-6 text-xs font-medium bg-white text-red-600 px-1.5 py-0.5 rounded">
              {firstName} {lastName}
            </div>
          )}
          
          {/* Optional: User Initials */}
          {firstName && lastName && (
            <div className="absolute right-2 bottom-1 text-xs text-white/60">
              {firstName.charAt(0)}{lastName.charAt(0)}
            </div>
          )}
        </div>
      </div>
      
      {/* Print Instructions with Background Warning */}
      <div className="bg-blue-50 p-4 rounded-lg w-full max-w-md mb-6">
        <h3 className="font-bold text-blue-800 mb-2 flex items-center">
          <PrinterIcon className="w-5 h-5 mr-2" />
          Printing Instructions
        </h3>
        <ol className="list-decimal pl-5 text-sm space-y-1 text-blue-900">
          <li><strong className="font-bold">Important:</strong> Enable Background graphics or Print backgrounds in your print settings</li>
          <li>Print at 100% scale (no size adjustment)</li>
          <li>Cut along the edges carefully</li>
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