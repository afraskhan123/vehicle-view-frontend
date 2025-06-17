
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { Vehicle } from '@/types/vehicle';

export const generateVehiclePDF = async (vehicle: Vehicle): Promise<string> => {
  const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
  
  // Set background color (light green/gray)
  pdf.setFillColor(240, 248, 255);
  pdf.rect(0, 0, 297, 210, 'F');
  
  // Add border
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(2);
  pdf.rect(10, 10, 277, 190);
  
  // Header section with logos and titles
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  
  // UAE header (Arabic)
  pdf.text('دولة الإمارات العربية المتحدة', 270, 25, { align: 'right' });
  pdf.text('جمارك دبي', 270, 32, { align: 'right' });
  
  // UAE header (English)
  pdf.setFontSize(12);
  pdf.text('United Arab Emirates', 270, 40, { align: 'right' });
  pdf.text('Dubai Customs', 270, 47, { align: 'right' });
  
  // Federal Authority section (English)
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('FEDERAL AUTHORITY FOR IDENTITY,', 20, 25);
  pdf.text('CITIZENSHIP, CUSTOMS & PORT SECURITY', 20, 32);
  
  // Card number and date section
  pdf.setFillColor(200, 220, 255);
  pdf.rect(15, 50, 267, 15, 'F');
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`رقم البطاقة : ${vehicle.vccNo}`, 270, 58, { align: 'right' });
  pdf.text(`Card No.`, 20, 58);
  
  pdf.text(`التاريخ : ${vehicle.vccGenerationDate}`, 270, 62, { align: 'right' });
  pdf.text(`Date`, 20, 62);
  
  // Main title section
  pdf.setFillColor(180, 200, 240);
  pdf.rect(80, 70, 137, 12, 'F');
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('بطاقة جمركية لوسائط النقل والمعدات الآلية', 270, 78, { align: 'right' });
  pdf.text('Vehicle Clearance Certificate Card', 148, 78, { align: 'center' });
  
  // Vehicle details section
  let yPos = 95;
  const lineHeight = 12;
  
  // Row 1: Vehicle Type and Load
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  
  pdf.text(`نوع المركبة (الشكل) :`, 270, yPos, { align: 'right' });
  pdf.text(`Vehicle Type`, 220, yPos);
  pdf.text(`${vehicle.vehicleType}`, 200, yPos, { align: 'right' });
  
  pdf.text(`حمولة :`, 130, yPos, { align: 'right' });
  pdf.text(`Load`, 100, yPos);
  pdf.text(`${vehicle.vehicleBrandName} - ${vehicle.vehicleModel}(${vehicle.vehicleType})`, 90, yPos, { align: 'right' });
  
  yPos += lineHeight;
  
  // Row 2: Model Year and Engine HP
  pdf.text(`سنة الصنع :`, 270, yPos, { align: 'right' });
  pdf.text(`Model Year`, 220, yPos);
  pdf.text(`${vehicle.yearOfBuilt} - TWO ZERO TWO FIVE`, 200, yPos, { align: 'right' });
  
  pdf.text(`قوة المحرك :`, 130, yPos, { align: 'right' });
  pdf.text(`Engine HP`, 100, yPos);
  
  yPos += lineHeight;
  
  // Row 3: Origin and Weight
  pdf.text(`بلد الصنع :`, 270, yPos, { align: 'right' });
  pdf.text(`Origin`, 220, yPos);
  pdf.text(`${vehicle.countryOfOrigin}`, 200, yPos, { align: 'right' });
  
  pdf.text(`الوزن :`, 130, yPos, { align: 'right' });
  pdf.text(`Weight`, 100, yPos);
  
  yPos += lineHeight;
  
  // Row 4: Chassis No and Importer
  pdf.text(`رقم القاعدة :`, 270, yPos, { align: 'right' });
  pdf.text(`Chassis No.`, 220, yPos);
  pdf.text(`${vehicle.chassisNo}`, 200, yPos, { align: 'right' });
  
  pdf.text(`المستورد/المالك :`, 130, yPos, { align: 'right' });
  pdf.text(`Importer or Owner`, 100, yPos);
  pdf.text(`${vehicle.ownerCode}`, 90, yPos, { align: 'right' });
  pdf.text(`${vehicle.ownerName}`, 90, yPos - 4, { align: 'right' });
  
  yPos += lineHeight;
  
  // Row 5: Color and Declaration No
  pdf.text(`اللون :`, 270, yPos, { align: 'right' });
  pdf.text(`Color`, 220, yPos);
  pdf.text(`${vehicle.vehicleColor}`, 200, yPos, { align: 'right' });
  
  pdf.text(`رقم البيان الجمركي :`, 130, yPos, { align: 'right' });
  pdf.text(`Declaration No.`, 100, yPos);
  pdf.text(`${vehicle.declarationNumber} - ${vehicle.declarationDate}`, 90, yPos, { align: 'right' });
  
  yPos += lineHeight;
  
  // Row 6: Engine No
  pdf.text(`رقم المحرك :`, 270, yPos, { align: 'right' });
  pdf.text(`Engine No.`, 220, yPos);
  pdf.text(`${vehicle.engineNumber}`, 200, yPos, { align: 'right' });
  
  yPos += 20;
  
  // Comments section
  pdf.setDrawColor(0, 0, 0);
  pdf.line(15, yPos, 282, yPos);
  
  yPos += 10;
  pdf.text(`ملاحظات`, 270, yPos, { align: 'right' });
  pdf.text(`Comments`, 20, yPos);
  
  yPos += 8;
  
  // Arabic comment text
  pdf.setFontSize(9);
  pdf.text('تم تحرير هذه البطاقة بعد انتهاء الإجراءات الجمركية على وسائط', 270, yPos, { align: 'right' });
  yPos += 5;
  pdf.text('النقل الموضحة بعاليه، وبعد التثبت من مستندات ملكيتها لا', 270, yPos, { align: 'right' });
  yPos += 5;
  pdf.text('مانع من إكمال إجرائها من قبل المرور', 270, yPos, { align: 'right' });
  
  // English comment
  yPos += 8;
  pdf.text(`${vehicle.specificationStandardName} "${vehicle.printRemarks}"`, 130, yPos);
  
  // Generate QR Code
  const publicUrl = `${window.location.origin}/public/vehicle/${vehicle.id}`;
  const qrCodeDataUrl = await QRCode.toDataURL(publicUrl, {
    width: 200,
    margin: 1
  });
  
  // Add QR Code to PDF
  pdf.addImage(qrCodeDataUrl, 'PNG', 20, yPos + 5, 25, 25);
  
  // System generated certificate text
  yPos += 25;
  pdf.setFontSize(8);
  pdf.setTextColor(255, 0, 0); // Red color
  pdf.text('هذه الشهادة تم إصدارها إلكترونيا', 270, yPos + 5, { align: 'right' });
  pdf.text('This is a system generated certificate', 50, yPos + 10);
  
  return pdf.output('datauristring');
};
