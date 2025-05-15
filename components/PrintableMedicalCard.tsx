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
  
  // Format user's full name for display or use placeholder
  const fullName = firstName && lastName 
    ? `${firstName} ${lastName}`.toUpperCase()
    : "USER NAME";
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the medical card');
      return;
    }
    
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
                background-color: #E62019 !important; /* Force red background */
                color: white !important;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px;
                box-sizing: border-box;
                position: relative;
                overflow: hidden;
              }
              .website {
                position: absolute;
                top: 15px;
                left: 20px;
                font-size: 22px;
                font-weight: bold;
                color: white !important;
                font-family: Arial, sans-serif;
              }
              .info-container {
                display: flex;
                flex-direction: column;
                position: relative;
                top: 10px;
                left: 10px;
              }
              .med-info {
                font-size: 60px;
                font-weight: bold;
                font-family: Arial, sans-serif;
                line-height: 0.9;
                color: white !important;
              }
              .user-name {
                margin-top: 15px;
                background-color: white !important;
                color: red !important;
                padding: 5px 8px;
                font-weight: bold;
                font-size: 16px;
                display: inline-block;
                font-family: Arial, sans-serif;
                max-width: 180px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .qr-container {
                background: white !important;
                padding: 8px;
                margin-right: 5px;
                width: 140px;
                height: 140px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .qr-image {
                width: 125px;
                height: 125px;
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
              .domain {
                position: absolute;
                right: 10px;
                bottom: 5px;
                font-size: 12px;
                color: white !important;
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
                background-color: #E62019;
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px;
                box-sizing: border-box;
                position: relative;
                overflow: hidden;
              }
              .website {
                position: absolute;
                top: 15px;
                left: 20px;
                font-size: 22px;
                font-weight: bold;
                color: white;
                font-family: Arial, sans-serif;
              }
              .info-container {
                display: flex;
                flex-direction: column;
                position: relative;
                top: 10px;
                left: 10px;
              }
              .med-info {
                font-size: 60px;
                font-weight: bold;
                line-height: 0.9;
                font-family: Arial, sans-serif;
              }
              .user-name {
                margin-top: 15px;
                background-color: white;
                color: red;
                padding: 5px 8px;
                font-weight: bold;
                font-size: 16px;
                display: inline-block;
                font-family: Arial, sans-serif;
                max-width: 180px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .qr-container {
                background: white;
                padding: 8px;
                margin-right: 5px;
                width: 140px;
                height: 140px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .qr-image {
                width: 125px;
                height: 125px;
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
              .domain {
                position: absolute;
                right: 10px;
                bottom: 5px;
                font-size: 12px;
                color: white;
                opacity: 0.8;
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
              <strong>IMPORTANTE:</strong> Asegúrate de que la opción Gráficos de fondo o Imprimir fondos esté habilitada en la configuración de impresión para obtener el fondo rojo. Esta configuración generalmente se encuentra en "Más configuración" en el cuadro de diálogo de impresión.
            </div>
            
            <div class="instructions">
              <h1>Tarjeta de Información Médica de Emergencia</h1>
              <p>Por favor, sigue estos pasos para crear tu tarjeta médica de emergencia:</p>
              <ol>
                <li>Imprime esta página a escala 100% (sin ajuste de tamaño)</li>
                <li>Asegúrate de que Gráficos de fondo esté habilitado en la configuración de impresión</li>
                <li>Recorta cuidadosamente siguiendo las líneas punteadas</li>
                <li>Dobla la tarjeta si es necesario y guárdala en tu billetera</li>
              </ol>
              <p>Al escanear este código QR, se proporcionará acceso a tu información médica crítica.</p>
            </div>
            
            <div class="card-container">
              <div class="card">
                <div class="corner top-left"></div>
                <div class="corner top-right"></div>
                <div class="corner bottom-left"></div>
                <div class="corner bottom-right"></div>
                
                <div class="info-container">
                  <div class="website">doctor.link</div>
                  <div class="med-info">
                    MED<br>INFO
                  </div>
                  <div class="user-name">${fullName}</div>
                </div>
                
                <div class="qr-container">
                  <img 
                    src="data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" shape-rendering="crispEdges" width="125" height="125"><path fill="#ffffff" d="M0 0h37v37H0z"/><path stroke="#000000" d="M4 4.5h7m1 0h1m1 0h3m1 0h2m3 0h1m1 0h1m1 0h1m1 0h3m1 0h7M4 5.5h1m5 0h1m1 0h2m1 0h1m2 0h1m1 0h2m2 0h1m3 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m5 0h3m1 0h1m1 0h1m3 0h1m3 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h1m3 0h1m3 0h1m3 0h1m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h3m1 0h2m1 0h1m3 0h3m6 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h9m1 0h1m9 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M13 11.5h1m1 0h3m3 0h2m1 0h3M5 12.5h1m1 0h1m2 0h3m2 0h1m1 0h2m1 0h1m3 0h1m1 0h1m1 0h2m1 0h5M4 13.5h2m1 0h1m2 0h1m1 0h2m1 0h2m1 0h1m5 0h3m1 0h1m1 0h6M4 14.5h4m3 0h2m1 0h2m2 0h1m3 0h1m2 0h1m2 0h1m1 0h6M5 15.5h1m1 0h3m1 0h2m1 0h1m3 0h1m2 0h1m3 0h1m2 0h1m1 0h1m1 0h4M4 16.5h1m2 0h2m3 0h3m1 0h4m3 0h1m2 0h3m2 0h3m1 0h1M4 17.5h1m2 0h1m1 0h5m5 0h5m3 0h3m1 0h5M5 18.5h1m1 0h2m3 0h1m4 0h2m1 0h2m2 0h1m4 0h7M5 19.5h1m2 0h2m1 0h3m1 0h4m1 0h1m2 0h1m1 0h5m1 0h1m1 0h1M6 20.5h2m3 0h1m1 0h5m4 0h1m2 0h1m3 0h1m3 0h3M4 21.5h1m2 0h3m1 0h2m1 0h1m1 0h1m4 0h1m1 0h1m2 0h3m1 0h1m3 0h1M6 22.5h1m1 0h7m1 0h7m2 0h4m1 0h1m3 0h1M4 23.5h2m4 0h1m3 0h2m2 0h3m4 0h2m2 0h1m5 0h1M4 24.5h1m1 0h2m2 0h4m3 0h2m3 0h1m3 0h1m1 0h1m1 0h1m1 0h3M4 25.5h1m1 0h2m2 0h2m2 0h1m5 0h3m2 0h1m1 0h3m1 0h1m1 0h3M4 26.5h1m2 0h1m5 0h2m1 0h2m1 0h1m1 0h1m2 0h3m3 0h5M4 27.5h2m2 0h4m2 0h5m2 0h1m3 0h2m1 0h3m2 0h3M12 28.5h1m4 0h2m6 0h2m1 0h2m2 0h3M4 29.5h7m1 0h2m3 0h2m1 0h2m2 0h1m1 0h1m1 0h1m2 0h1m1 0h3M4 30.5h1m5 0h1m1 0h4m1 0h1m3 0h3m4 0h1m1 0h2m1 0h3M4 31.5h1m1 0h3m1 0h1m1 0h1m1 0h2m4 0h1m1 0h1m1 0h2m3 0h1m1 0h1m1 0h3M4 32.5h1m1 0h3m1 0h1m3 0h2m1 0h1m1 0h3m2 0h1m3 0h2m3 0h3M4 33.5h1m1 0h3m1 0h1m1 0h1m2 0h1m1 0h2m1 0h1m1 0h1m1 0h1m1 0h2m1 0h1m1 0h5M4 34.5h1m5 0h1m2 0h1m2 0h2m2 0h1m1 0h1m1 0h2m3 0h1m5 0h1M4 35.5h7m1 0h1m2 0h3m2 0h3m1 0h2m2 0h3m1 0h4"/></svg>`)}" 
                    alt="Medical QR Code" 
                    class="qr-image"
                  />
                </div>
                
                <div class="domain">doctqr.link</div>
              </div>
            </div>
            
            <button class="no-print" onclick="window.print()">Imprimir Tarjeta Médica</button>
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
      <h2 className="text-xl font-bold mb-4">Tarjeta Médica de Emergencia</h2>
      <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
        Imprime esta tarjeta de información médica de emergencia del tamaño de una tarjeta de crédito para llevar en tu billetera
      </p>
      
      {/* Card Preview */}
      <div className="relative w-[3.375in] h-[2.125in] mb-8 shadow-md" ref={cardRef}>
        <div className="absolute inset-0 bg-red-600 text-white overflow-hidden flex items-center justify-between p-3">
          {/* Corners */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-white"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-white"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-white"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-white"></div>
          
          {/* Left side with info */}
          <div className="flex flex-col ml-3 mt-2">
            {/* Website */}
            <div className="text-xl font-italic">doctor.link</div>
            
            {/* Med Info */}
            <div className="text-5xl font-bold leading-none mt-1">
              MED<br/>INFO
            </div>
            
            {/* User Name */}
            <div className="mt-3 bg-white text-red-600 text-xs px-2 py-1 font-bold inline-block">
              {fullName}
            </div>
          </div>
          
          {/* QR Code */}
          <div className="bg-white p-2 mr-2" style={{ width: "120px", height: "120px" }}>
            <QRCodeReact
              value={absoluteUrl}
              size={105}
              level="H"
              bgColor="#FFFFFF"
              fgColor="#000000"
            />
          </div>
          
          {/* Website domain at bottom */}
          <div className="absolute right-2 bottom-1 text-xs text-white/70">
            doctqr.link
          </div>
        </div>
      </div>
      
      {/* Print Instructions with Background Warning */}
      <div className="bg-blue-50 p-4 rounded-lg w-full max-w-md mb-6">
        <h3 className="font-bold text-blue-800 mb-2 flex items-center">
          <PrinterIcon className="w-5 h-5 mr-2" />
          Instrucciones de Impresión
        </h3>
        <ol className="list-decimal pl-5 text-sm space-y-1 text-blue-900">
          <li>Haz clic en el botón "Imprimir Tarjeta" a continuación</li>
          <li>Imprime a escala 100% (sin ajuste de tamaño)</li>
          <li><strong className="text-red-600">Importante:</strong> Habilita Gráficos de fondo en la configuración de impresión</li>
          <li>Recorta cuidadosamente siguiendo las líneas punteadas</li>
          <li>Guárdala en tu billetera para situaciones de emergencia</li>
        </ol>
      </div>
      
      {/* Print Button */}
      <Button
        color="primary"
        size="lg"
        startContent={<PrinterIcon className="w-5 h-5" />}
        onClick={handlePrint}
      >
        Imprimir Tarjeta Médica
      </Button>
    </div>
  );
};

export default PrintableMedicalCard;