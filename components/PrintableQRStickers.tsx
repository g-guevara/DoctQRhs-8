"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { PrinterIcon } from "@heroicons/react/24/outline";
import QRCodeReact from "react-qr-code";

interface PrintableQRStickersProps {
  url: string;
  firstName?: string;
  lastName?: string;
}

const PrintableQRStickers: React.FC<PrintableQRStickersProps> = ({ 
  url,
  firstName = "",
  lastName = "" 
}) => {
  // Ensure URL is absolute
  const absoluteUrl = url.startsWith('http') ? url : `https://www.doctqr.link${url.startsWith('/') ? '' : '/'}${url}`;
  
  // Get user initials if names are provided
  const initials = firstName && lastName 
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : "";

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the stickers');
      return;
    }
    
    // Generate QR code data URL
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
          
          // Write the print window with the QR code stickers
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>DoctQR - Medical QR Code Stickers</title>
                <style>
                  /* Critical: Force background colors to print */
                  * {
                    -webkit-print-color-adjust: exact !important;
                    color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    box-sizing: border-box;
                  }
                  
                  @page {
                    size: letter;
                    margin: 0.25in;
                  }
                  
                  body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                  }
                  
                  .page {
                    width: 8.5in;
                    padding: 0.25in;
                    position: relative;
                  }
                  
                  .print-note {
                    background-color: #f8f9fa !important;
                    border: 1px solid #ddd !important;
                    padding: 10px !important;
                    margin-bottom: 20px !important;
                    font-size: 14px !important;
                  }
                  
                  .print-note strong {
                    color: #d00 !important;
                    font-weight: bold !important;
                  }
                  
                  .stickers-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-gap: 0.5in;
                    width: 100%;
                  }
                  
                  .sticker {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    position: relative;
                    width: 3.5in;
                    height: 3.5in;
                  }
                  
                  .sticker-inner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                  }
                  
                  .qr-container {
                    background: white;
                    padding: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  
                  .cutting-guide {
                    border: 1px dashed #888;
                  }
                  
                  /* Sticker 1 - Round */
                  .sticker-round {
                    position: relative;
                  }
                  
                  .sticker-round .cutting-guide {
                    width: 3in;
                    height: 3in;
                    border-radius: 50%;
                  }
                  
                  .sticker-round .sticker-inner {
                    width: 2.9in;
                    height: 2.9in;
                    border-radius: 50%;
                    background: #3b82f6 !important;
                    border: 5px solid white !important;
                    overflow: hidden;
                    position: absolute;
                    top: 0.05in;
                    left: 0.05in;
                  }
                  
                  .sticker-round .qr-container {
                    width: 1.7in;
                    height: 1.7in;
                    border-radius: 50%;
                    box-shadow: 0 0 0 5px white !important;
                  }
                  
                  .sticker-round .sticker-label {
                    position: absolute;
                    bottom: 0.4in;
                    color: white !important;
                    font-weight: bold;
                    font-size: 16px;
                    text-align: center;
                  }
                  
                  /* Sticker 2 - Square with rounded corners */
                  .sticker-square {
                    position: relative;
                  }
                  
                  .sticker-square .cutting-guide {
                    width: 2.5in;
                    height: 2.5in;
                    border-radius: 0.25in;
                  }
                  
                  .sticker-square .sticker-inner {
                    width: 2.4in;
                    height: 2.4in;
                    border-radius: 0.2in;
                    background: #ef4444 !important;
                    overflow: hidden;
                    position: absolute;
                    top: 0.05in;
                    left: 0.05in;
                    flex-direction: column;
                  }
                  
                  .sticker-square .qr-container {
                    width: 1.6in;
                    height: 1.6in;
                    margin-top: 0.1in;
                    border-radius: 0.15in;
                  }
                  
                  .sticker-square .sticker-label {
                    color: white !important;
                    font-weight: bold;
                    font-size: 18px;
                    margin-top: 0.1in;
                  }
                  
                  /* Sticker 3 - Tag style */
                  .sticker-tag {
                    position: relative;
                  }
                  
                  .sticker-tag .cutting-guide {
                    width: 2.75in;
                    height: 2in;
                    border-radius: 0.2in;
                  }
                  
                  .sticker-tag .sticker-inner {
                    width: 2.65in;
                    height: 1.9in;
                    border-radius: 0.15in;
                    background: white !important;
                    border: 2px solid #6b7280 !important;
                    overflow: hidden;
                    position: absolute;
                    top: 0.05in;
                    left: 0.05in;
                  }
                  
                  .sticker-tag .tag-header {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 0.4in;
                    background: #10b981 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white !important;
                    font-weight: bold;
                  }
                  
                  .sticker-tag .qr-container {
                    width: 1.4in;
                    height: 1.4in;
                    margin-top: 0.4in;
                  }
                  
                  .sticker-tag .tag-hole {
                    position: absolute;
                    top: 0.2in;
                    right: 0.2in;
                    width: 0.2in;
                    height: 0.2in;
                    border-radius: 50%;
                    background: white !important;
                    border: 1px solid #6b7280 !important;
                  }
                  
                  /* Sticker 4 - Badge style */
                  .sticker-badge {
                    position: relative;
                  }
                  
                  .sticker-badge .cutting-guide {
                    width: 2.5in;
                    height: 3in;
                    border-radius: 0.15in;
                  }
                  
                  .sticker-badge .sticker-inner {
                    width: 2.4in;
                    height: 2.9in;
                    border-radius: 0.1in;
                    background: #f3f4f6 !important;
                    border: 2px solid #6b7280 !important;
                    overflow: hidden;
                    position: absolute;
                    top: 0.05in;
                    left: 0.05in;
                    flex-direction: column;
                  }
                  
                  .sticker-badge .badge-header {
                    width: 100%;
                    height: 0.6in;
                    background: #4f46e5 !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white !important;
                    font-weight: bold;
                    font-size: 18px;
                  }
                  
                  .sticker-badge .qr-container {
                    width: 1.6in;
                    height: 1.6in;
                    margin-top: 0.2in;
                    border: 1px solid #d1d5db !important;
                  }
                  
                  .sticker-badge .badge-footer {
                    margin-top: 0.1in;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  }
                  
                  .sticker-badge .badge-name {
                    font-weight: bold;
                    font-size: 16px;
                  }
                  
                  .sticker-badge .badge-scan {
                    font-size: 12px;
                    color: #6b7280 !important;
                  }
                  
                  /* Sticker 5 - Keychain style */
                  .sticker-keychain {
                    position: relative;
                  }
                  
                  .sticker-keychain .cutting-guide {
                    width: 2in;
                    height: 3in;
                    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
                  }
                  
                  .sticker-keychain .sticker-inner {
                    width: 1.9in;
                    height: 2.9in;
                    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
                    background: #8b5cf6 !important;
                    position: absolute;
                    top: 0.05in;
                    left: 0.05in;
                    flex-direction: column;
                  }
                  
                  .sticker-keychain .qr-container {
                    width: 1.4in;
                    height: 1.4in;
                    margin-top: 0.7in;
                    border-radius: 0.1in;
                  }
                  
                  .sticker-keychain .keychain-text {
                    color: white !important;
                    font-weight: bold;
                    margin-top: 0.1in;
                    font-size: 16px;
                  }
                  
                  .sticker-keychain .keychain-hole {
                    position: absolute;
                    top: 0.2in;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0.3in;
                    height: 0.3in;
                    border-radius: 50%;
                    background: white !important;
                    border: 2px solid #6b7280 !important;
                  }
                  
                  /* Sticker 6 - Mini stickers */
                  .sticker-mini {
                    position: relative;
                  }
                  
                  .mini-container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-gap: 0.2in;
                    width: 3in;
                  }
                  
                  .mini-item {
                    position: relative;
                  }
                  
                  .mini-item .cutting-guide {
                    width: 1.4in;
                    height: 1.4in;
                    border-radius: 0.1in;
                  }
                  
                  .mini-item .sticker-inner {
                    width: 1.3in;
                    height: 1.3in;
                    border-radius: 0.05in;
                    position: absolute;
                    top: 0.05in;
                    left: 0.05in;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                  }
                  
                  .mini-item:nth-child(1) .sticker-inner {
                    background: #ec4899 !important;
                  }
                  
                  .mini-item:nth-child(2) .sticker-inner {
                    background: #14b8a6 !important;
                  }
                  
                  .mini-item:nth-child(3) .sticker-inner {
                    background: #eab308 !important;
                  }
                  
                  .mini-item:nth-child(4) .sticker-inner {
                    background: #6366f1 !important;
                  }
                  
                  .mini-item .qr-container {
                    width: 0.8in;
                    height: 0.8in;
                    border-radius: 0.05in;
                  }
                  
                  .mini-item .mini-text {
                    color: white !important;
                    font-weight: bold;
                    font-size: 12px;
                    margin-top: 0.05in;
                  }
                  
                  .no-print {
                    display: none;
                  }
                  
                  .sticker-name {
                    position: absolute;
                    bottom: -0.3in;
                    font-size: 12px;
                    color: #6b7280 !important;
                    text-align: center;
                    width: 100%;
                  }
                  
                  @media screen {
                    .page {
                      background: white;
                      margin: 0 auto;
                      box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
                  }
                </style>
              </head>
              <body>
                <div class="page">
                  <div class="print-note">
                    <strong>IMPORTANT:</strong> Please make sure Background graphics or Print backgrounds is enabled in your print settings for the stickers to display correctly. This setting is usually found under More settings in the print dialog.
                  </div>
                  
                  <h1>Medical QR Code Stickers</h1>
                  <p>Print these stickers on sticker paper or card stock, then cut along the dashed lines. Each sticker contains your personal medical QR code.</p>
                  
                  <div class="stickers-grid">
                    <!-- Sticker 1: Round -->
                    <div class="sticker sticker-round">
                      <div class="cutting-guide"></div>
                      <div class="sticker-inner">
                        <div class="qr-container">
                          <img src="${svgDataUrl}" alt="Medical QR Code" width="130" height="130">
                        </div>
                        <div class="sticker-label">MEDICAL INFO</div>
                      </div>
                      <div class="sticker-name">Circle Sticker</div>
                    </div>
                    
                    <!-- Sticker 2: Square with rounded corners -->
                    <div class="sticker sticker-square">
                      <div class="cutting-guide"></div>
                      <div class="sticker-inner">
                        <div class="qr-container">
                          <img src="${svgDataUrl}" alt="Medical QR Code" width="130" height="130">
                        </div>
                        <div class="sticker-label">MED ID</div>
                      </div>
                      <div class="sticker-name">Square Sticker</div>
                    </div>
                    
                    <!-- Sticker 3: Tag style -->
                    <div class="sticker sticker-tag">
                      <div class="cutting-guide"></div>
                      <div class="sticker-inner">
                        <div class="tag-header">MEDICAL INFORMATION</div>
                        <div class="qr-container">
                          <img src="${svgDataUrl}" alt="Medical QR Code" width="120" height="120">
                        </div>
                        <div class="tag-hole"></div>
                      </div>
                      <div class="sticker-name">Tag Sticker</div>
                    </div>
                    
                    <!-- Sticker 4: Badge style -->
                    <div class="sticker sticker-badge">
                      <div class="cutting-guide"></div>
                      <div class="sticker-inner">
                        <div class="badge-header">MEDICAL ID</div>
                        <div class="qr-container">
                          <img src="${svgDataUrl}" alt="Medical QR Code" width="130" height="130">
                        </div>
                        <div class="badge-footer">
                          <div class="badge-name">${firstName ? firstName + ' ' + lastName : 'SCAN FOR INFO'}</div>
                          <div class="badge-scan">doctqr.link</div>
                        </div>
                      </div>
                      <div class="sticker-name">ID Badge</div>
                    </div>
                    
                    <!-- Sticker 5: Keychain style -->
                    <div class="sticker sticker-keychain">
                      <div class="cutting-guide"></div>
                      <div class="sticker-inner">
                        <div class="keychain-hole"></div>
                        <div class="qr-container">
                          <img src="${svgDataUrl}" alt="Medical QR Code" width="120" height="120">
                        </div>
                        <div class="keychain-text">MED INFO</div>
                      </div>
                      <div class="sticker-name">Keychain Tag</div>
                    </div>
                    
                    <!-- Sticker 6: Mini stickers -->
                    <div class="sticker sticker-mini">
                      <div class="mini-container">
                        <div class="mini-item">
                          <div class="cutting-guide"></div>
                          <div class="sticker-inner">
                            <div class="qr-container">
                              <img src="${svgDataUrl}" alt="Medical QR Code" width="70" height="70">
                            </div>
                            <div class="mini-text">MED</div>
                          </div>
                        </div>
                        <div class="mini-item">
                          <div class="cutting-guide"></div>
                          <div class="sticker-inner">
                            <div class="qr-container">
                              <img src="${svgDataUrl}" alt="Medical QR Code" width="70" height="70">
                            </div>
                            <div class="mini-text">MED</div>
                          </div>
                        </div>
                        <div class="mini-item">
                          <div class="cutting-guide"></div>
                          <div class="sticker-inner">
                            <div class="qr-container">
                              <img src="${svgDataUrl}" alt="Medical QR Code" width="70" height="70">
                            </div>
                            <div class="mini-text">MED</div>
                          </div>
                        </div>
                        <div class="mini-item">
                          <div class="cutting-guide"></div>
                          <div class="sticker-inner">
                            <div class="qr-container">
                              <img src="${svgDataUrl}" alt="Medical QR Code" width="70" height="70">
                            </div>
                            <div class="mini-text">MED</div>
                          </div>
                        </div>
                      </div>
                      <div class="sticker-name">Mini Stickers (4)</div>
                    </div>
                  </div>
                  
                  <div style="text-align: center; margin-top: 0.5in;">
                    <button class="no-print" onclick="window.print()">Print Stickers</button>
                  </div>
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
    <div className="flex flex-col items-center mt-8 mb-10">
      <h2 className="text-2xl font-bold mb-4">Medical QR Code Stickers</h2>
      <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
        Print a variety of stickers, tags, and cards with your medical QR code
      </p>
      
      {/* Preview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {/* Circle Preview */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center p-2">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <QRCodeReact value={absoluteUrl} size={60} level="M" />
            </div>
          </div>
          <p className="text-xs mt-2">Circle</p>
        </div>
        
        {/* Square Preview */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-lg bg-red-500 flex flex-col items-center justify-center p-1">
            <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center">
              <QRCodeReact value={absoluteUrl} size={60} level="M" />
            </div>
            <span className="text-white text-xs mt-1 font-bold">MED ID</span>
          </div>
          <p className="text-xs mt-2">Square</p>
        </div>
        
        {/* Tag Preview */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-20 rounded-lg bg-white border-2 border-gray-300 relative">
            <div className="h-5 w-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">MEDICAL INFO</span>
            </div>
            <div className="w-4 h-4 rounded-full bg-white border border-gray-300 absolute right-1 top-1"></div>
            <div className="flex justify-center mt-1">
              <QRCodeReact value={absoluteUrl} size={50} level="M" />
            </div>
          </div>
          <p className="text-xs mt-2">Tag</p>
        </div>
        
        {/* Badge Preview */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-28 rounded bg-gray-100 border-2 border-gray-300 flex flex-col items-center overflow-hidden">
            <div className="w-full h-6 bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">MEDICAL ID</span>
            </div>
            <div className="flex justify-center mt-1">
              <QRCodeReact value={absoluteUrl} size={50} level="M" />
            </div>
            <span className="text-[8px] font-bold mt-1">SCAN FOR INFO</span>
          </div>
          <p className="text-xs mt-2">Badge</p>
        </div>
        
        {/* Keychain Preview */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-24 flex items-center justify-center relative" style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
          }}>
            <div className="w-full h-full absolute bg-purple-500 flex flex-col items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white border border-gray-400 absolute" style={{ top: '10%' }}></div>
              <div className="bg-white p-1 rounded-sm mt-3">
                <QRCodeReact value={absoluteUrl} size={40} level="M" />
              </div>
              <span className="text-white text-[8px] font-bold mt-1">MED INFO</span>
            </div>
          </div>
          <p className="text-xs mt-2">Keychain</p>
        </div>
        
        {/* Mini Stickers Preview */}
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-11 h-11 rounded bg-pink-500 flex flex-col items-center justify-center p-1">
              <div className="bg-white p-1 rounded-sm">
                <QRCodeReact value={absoluteUrl} size={25} level="M" />
              </div>
              <span className="text-white text-[6px] font-bold">MED</span>
            </div>
            <div className="w-11 h-11 rounded bg-teal-500 flex flex-col items-center justify-center p-1">
              <div className="bg-white p-1 rounded-sm">
                <QRCodeReact value={absoluteUrl} size={25} level="M" />
              </div>
              <span className="text-white text-[6px] font-bold">MED</span>
            </div>
            <div className="w-11 h-11 rounded bg-yellow-500 flex flex-col items-center justify-center p-1">
              <div className="bg-white p-1 rounded-sm">
                <QRCodeReact value={absoluteUrl} size={25} level="M" />
              </div>
              <span className="text-white text-[6px] font-bold">MED</span>
            </div>
            <div className="w-11 h-11 rounded bg-indigo-500 flex flex-col items-center justify-center p-1">
              <div className="bg-white p-1 rounded-sm">
                <QRCodeReact value={absoluteUrl} size={25} level="M" />
              </div>
              <span className="text-white text-[6px] font-bold">MED</span>
            </div>
          </div>
          <p className="text-xs mt-2">Mini (x4)</p>
        </div>
      </div>
      
      {/* Print Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg w-full max-w-md mb-6">
        <h3 className="font-bold text-blue-800 mb-2 flex items-center">
          <PrinterIcon className="w-5 h-5 mr-2" />
          Printing Instructions
        </h3>
        <ol className="list-decimal pl-5 text-sm space-y-1 text-blue-900">
          <li>Click the button below to open the printable sticker sheet</li>
          <li>Print on sticker paper or card stock for best results</li>
          <li>Make sure Background Graphics is enabled in print settings</li>
          <li>Carefully cut along the dashed lines</li>
        </ol>
      </div>
      
      {/* Print Button */}
      <Button
        color="primary"
        size="lg"
        startContent={<PrinterIcon className="w-5 h-5" />}
        onClick={handlePrint}
      >
        Print QR Stickers
      </Button>
    </div>
  );
};

export default PrintableQRStickers;