
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { Vehicle } from '@/types/vehicle';

export const generateVehiclePDF = async (vehicle: Vehicle): Promise<string> => {
  const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
  
  // Add the background image
  const backgroundImageUrl = '/lovable-uploads/050a130d-e6dd-4406-ae2d-0e528890de70.png';
  pdf.addImage(backgroundImageUrl, 'PNG', 0, 0, 297, 210);
  
  // Set text properties for overlaying data
  pdf.setTextColor(0, 0, 0); // Black text
  pdf.setFont('helvetica', 'normal');
  
  // Position dynamic data over the background image
  // Card number and date (top section)
  pdf.setFontSize(10);
  pdf.text(vehicle.vccNo, 160, 123); // Card No.
  pdf.text(vehicle.vccGenerationDate, 250, 123); // Date
  
  // Vehicle details section - positioning based on the form structure
  pdf.setFontSize(9);
  
  // Vehicle Type
  pdf.text(vehicle.vehicleType, 160, 150);
  
  // Load (combining brand and model)
  pdf.text(`${vehicle.vehicleBrandName} - ${vehicle.vehicleModel}`, 80, 165);
  
  // Model Year
  pdf.text(vehicle.yearOfBuilt, 160, 180);
  
  // Engine HP (if available)
  if (vehicle.engineCapacity) {
    pdf.text(vehicle.engineCapacity, 80, 195);
  }
  
  // Origin
  pdf.text(vehicle.countryOfOrigin, 160, 210);
  
  // Weight (if available)
  if (vehicle.carriageCapacity) {
    pdf.text(vehicle.carriageCapacity, 80, 225);
  }
  
  // Chassis No.
  pdf.text(vehicle.chassisNo, 160, 240);
  
  // Importer or Owner
  pdf.text(vehicle.ownerName, 80, 255);
  pdf.text(vehicle.ownerCode, 80, 265);
  
  // Color
  pdf.text(vehicle.vehicleColor, 160, 275);
  
  // Declaration No.
  pdf.text(`${vehicle.declarationNumber} - ${vehicle.declarationDate}`, 80, 290);
  
  // Engine No.
  pdf.text(vehicle.engineNumber, 160, 305);
  
  // Generate QR Code
  const publicUrl = `${window.location.origin}/public/vehicle/${vehicle.id}`;
  const qrCodeDataUrl = await QRCode.toDataURL(publicUrl, {
    width: 120,
    margin: 1
  });
  
  // Add QR Code to PDF (positioned in the comments section)
  pdf.addImage(qrCodeDataUrl, 'PNG', 20, 320, 30, 30);
  
  return pdf.output('datauristring');
};
