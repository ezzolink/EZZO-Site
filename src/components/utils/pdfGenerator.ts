import { jsPDF } from "jspdf";

export const generateInvoicePDF = (data) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235); // Blue color
  doc.text("EZZO Digital", 105, 20, null, null, "center");
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Transformando ideias em realidade digital", 105, 30, null, null, "center");
  
  // Client Info
  doc.text(`Cliente: ${data.name || 'N/A'}`, 20, 50);
  doc.text(`Email: ${data.email || 'N/A'}`, 20, 60);
  doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 70);
  
  // Services
  doc.setFontSize(14);
  doc.text("Serviços Solicitados:", 20, 90);
  
  doc.setFontSize(12);
  const services = Array.isArray(data.service) ? data.service : [data.service];
  let y = 100;
  
  services.forEach(service => {
    doc.text(`• ${service}`, 25, y);
    y += 10;
  });
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Este documento é uma solicitação de orçamento.", 105, 280, null, null, "center");
  doc.text("www.ezzo.ao | contato@ezzo.ao", 105, 285, null, null, "center");
  
  doc.save(`orcamento_ezzo_${Date.now()}.pdf`);
};
