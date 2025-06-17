
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { Vehicle } from '@/types/vehicle';

export const generateVehiclePDF = async (vehicle: Vehicle): Promise<string> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Vehicle Clearance Certificate Card', 105, 20, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Federal Authority for Identity, Citizenship, Customs & Port Security', 105, 30, { align: 'center' });
  pdf.text('United Arab Emirates - Dubai Customs', 105, 38, { align: 'center' });
  
  // VCC Number and Date
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Card No: ${vehicle.vccNo}`, 20, 55);
  pdf.text(`Date: ${vehicle.vccGenerationDate}`, 150, 55);
  
  // Vehicle Details
  const details = [
    [`Vehicle Type: ${vehicle.vehicleType}`, `Load: ${vehicle.vehicleBrandName} - ${vehicle.vehicleModel}`],
    [`Model Year: ${vehicle.yearOfBuilt}`, `Engine HP: ${vehicle.engineCapacity || 'N/A'}`],
    [`Origin: ${vehicle.countryOfOrigin}`, `Weight: N/A`],
    [`Chassis No: ${vehicle.chassisNo}`, `Importer or Owner: ${vehicle.ownerName}`],
    [`Color: ${vehicle.vehicleColor}`, `Declaration No: ${vehicle.declarationNumber}`],
    [`Engine No: ${vehicle.engineNumber}`, ``]
  ];
  
  let yPos = 75;
  details.forEach(([left, right]) => {
    pdf.setFont('helvetica', 'normal');
    pdf.text(left, 20, yPos);
    if (right) pdf.text(right, 110, yPos);
    yPos += 8;
  });
  
  // Comments section
  yPos += 10;
  pdf.setFont('helvetica', 'bold');
  pdf.text('Comments:', 20, yPos);
  yPos += 8;
  pdf.setFont('helvetica', 'normal');
  pdf.text(`${vehicle.specificationStandardName}`, 20, yPos);
  yPos += 6;
  if (vehicle.printRemarks) {
    const remarks = vehicle.printRemarks.split('"').filter(r => r.trim());
    remarks.forEach(remark => {
      if (remark.trim()) {
        pdf.text(`"${remark.trim()}"`, 20, yPos);
        yPos += 6;
      }
    });
  }
  
  // Generate QR Code
  const publicUrl = `${window.location.origin}/public/vehicle/${vehicle.id}`;
  const qrCodeDataUrl = await QRCode.toDataURL(publicUrl, {
    width: 100,
    margin: 1
  });
  
  // Add QR Code to PDF
  pdf.addImage(qrCodeDataUrl, 'PNG', 20, yPos + 10, 30, 30);
  
  pdf.setFontSize(10);
  pdf.text('This is a system generated certificate', 60, yPos + 35);
  
  return pdf.output('datauristring');
};
