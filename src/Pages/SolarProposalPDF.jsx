import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import companyLogo from '../assets/companylogo.png';

// Theme Colors from reference PDF & project
const PRIMARY = '#316398';
const SECONDARY = '#4596AB';
const DARK_TEXT = '#1E293B';
const MUTED_TEXT = '#64748B';
const BORDER_COLOR = '#CBD5E1';
const LIGHT_BG = '#F8FAFC';
const RED_TEXT = '#EF4444';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: DARK_TEXT,
    lineHeight: 1.45,
    paddingTop: 110,
    paddingBottom: 70,
    paddingHorizontal: 45,
  },
  // Custom absolute header on each page
  headerContainer: {
    position: 'absolute',
    top: 25,
    left: 45,
    right: 45,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  logo: {
    height: 34,
    width: 'auto',
  },
  tagline: {
    fontSize: 7.5,
    color: MUTED_TEXT,
    marginTop: 2,
    fontStyle: 'italic',
  },
  headerRightText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: PRIMARY,
    textTransform: 'uppercase',
  },
  // Custom absolute footer on each page
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 45,
    paddingBottom: 8,
    fontSize: 7.5,
    color: MUTED_TEXT,
  },
  footerLeft: {
    flexDirection: 'column',
    gap: 2,
  },
  footerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 2,
  },
  footerBands: {
    height: 18,
    flexDirection: 'row',
    width: '100%',
  },
  footerTealBand: {
    backgroundColor: SECONDARY,
    flex: 3,
  },
  footerBlackBand: {
    backgroundColor: '#1E293B',
    flex: 1,
  },

  // Cover / Letter Page Styles
  letterMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 10,
  },
  letterTitle: {
    fontSize: 12.5,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecoration: 'underline',
    color: '#000000',
    marginVertical: 15,
    lineHeight: 1.3,
  },
  letterBody: {
    marginTop: 10,
    fontSize: 10,
    flexDirection: 'column',
    gap: 12,
  },
  letterParagraph: {
    textAlign: 'justify',
  },
  letterSignOff: {
    marginTop: 25,
    fontSize: 10,
    lineHeight: 1.4,
  },

  // Titles
  pageTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: PRIMARY,
    textTransform: 'uppercase',
    marginBottom: 10,
    textDecoration: 'underline',
  },
  pageSubtitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
    textDecoration: 'underline',
    marginTop: 8,
    marginBottom: 6,
  },

  // Tables
  table: {
    width: '100%',
    borderWidth: 0.75,
    borderColor: '#000000',
    marginVertical: 8,
  },
  bankTable: {
    width: '100%',
    height: "40%",
    borderWidth: 0.75,
    borderColor: '#000000',
    marginVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
    minHeight: 22,
    alignItems: 'center',
  },
  tableRowLast: {
    flexDirection: 'row',
    minHeight: 22,
    alignItems: 'center',
  },
  tableHeader: {
    fontWeight: 'bold',
    minHeight: 24,
  },
  tableCell: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 9,
  },
  cellBold: {
    fontWeight: 'bold',
  },
  cellCenter: {
    textAlign: 'center',
  },
  cellRight: {
    textAlign: 'right',
  },
  cellRed: {
    color: RED_TEXT,
    fontWeight: 'bold',
  },

  // Table Columns (Specific to widths)
  colSl: { width: '12%' },
  colPart: { width: '58%' },
  colAmt: { width: '30%' },
  
  colSpecParam: { width: '35%', borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%' },
  colSpecVal: { width: '65%' },

  colCompNo: { width: '8%', borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%' },
  colCompName: { width: '32%', borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%' },
  colCompSpec: { width: '60%' },

  colBankLabel: { width: '35%', borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%' },
  colBankVal: { width: '65%' },

  // Bullet Lists
  bulletList: {
    flexDirection: 'column',
    gap: 5,
    marginVertical: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  bulletDot: {
    width: 12,
    fontSize: 10,
    fontWeight: 'bold',
  },
  bulletText: {
    flex: 1,
    textAlign: 'justify',
    fontSize: 9.5,
  },

  // Signatures
  sigSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
  },
  sigBlock: {
    width: '45%',
    flexDirection: 'column',
  },
  sigText: {
    fontSize: 9.5,
    fontWeight: 'bold',
    marginBottom: 35,
  },
  sigLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    width: '80%',
    marginBottom: 4,
  },
  sigLabel: {
    fontSize: 8.5,
    color: MUTED_TEXT,
  }
});

// Helper function to invert white logo to black dynamically in canvas
export const getBlackLogo = (logoUrl) => {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = logoUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL());
    };
    img.onerror = () => {
      resolve(logoUrl);
    };
  });
};

// Custom Header and Footer for reuse
const HeaderComponent = ({ pageTitle = "Proposal", logo }) => (
  <View style={styles.headerContainer} fixed>
    <View style={styles.headerRow}>
      <View>
        {logo ? (
          <Image src={logo} style={styles.logo} />
        ) : companyLogo ? (
          <Image src={companyLogo} style={styles.logo} />
        ) : (
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: PRIMARY }}>SUNBIRD SOLAR</Text>
        )}
        <Text style={styles.tagline}>Sunbird Power Solutions</Text>
      </View>
      <Text style={styles.headerRightText}>{pageTitle}</Text>
    </View>
  </View>
);

const FooterComponent = () => (
  <View style={styles.footerContainer} fixed>
    <View style={styles.footerInfoRow}>
      <View style={styles.footerLeft}>
        <Text>Mob: +91 9874561230, 9123456789</Text>
        <Text>Kozhikode</Text>
      </View>
      <View style={styles.footerRight}>
        <Text>sunbirdpowersolutions@gmail.com</Text>
        <Text>GST No: 32DZPPK5774NIZJ</Text>
      </View>
    </View>
    <View style={styles.footerBands}>
      <View style={styles.footerTealBand} />
      <View style={styles.footerBlackBand} />
    </View>
  </View>
);

export default function SolarProposalPDF({ data, logo }) {
  if (!data) return null;

  // Format dates
  const createdDate = data.createdAt 
    ? new Date(data.createdAt).toLocaleDateString('en-GB')
    : new Date().toLocaleDateString('en-GB');

  // Format currency
  const formatCurrency = (val) => {
  return `Rs. ${Number(val).toLocaleString('en-IN')}/-`;
};

  const calculatedSystemCostAfterSubsidy = data.systemCost - data.subsidy;

  return (
    <Document title={`Quotation - ${data.quotationNo}`}>
      
      {/* PAGE 1: COVER PAGE / LETTER */}
      <Page size="A4" style={styles.page}>
        <HeaderComponent pageTitle="Solar Power System Proposal" logo={logo} />
        
        <View style={styles.letterMetaRow}>
          <Text>{data.quotationNo}</Text>
          <Text>Date: {createdDate}</Text>
        </View>

        <Text style={styles.letterTitle}>
          PROPOSAL FOR {data.capacity}KWP ON-GRID SOLAR POWER PLANT WITH {Math.ceil(data.capacity)}KW INVERTER
        </Text>

        <View style={styles.letterBody}>
          <Text style={{ fontWeight: 'bold' }}>Dear {data.customerName || "Sir"},</Text>
          
          <Text style={styles.letterParagraph}>
            At the outset allow us to thank you for the opportunity to assess your property and power consumption.
          </Text>
          
          <Text style={styles.letterParagraph}>
            After carefully understanding your requirement and the lay-out, we have designed a Solar Power System proposal, which would not only reduce your power bills significantly; it would also act as an uninterrupted source of high power (provided your consumption stays optimum to our assessed values).
          </Text>

          <Text style={styles.letterParagraph}>
            Should you need any further clarification or information, please do not hesitate to contact me on the number or email id below.
          </Text>

          <Text style={styles.letterParagraph}>
            Looking forward to help you reduce your expenses and to render a sustainable green energy source.
          </Text>
        </View>

        <View style={styles.letterSignOff}>
          <Text>Thanks & Regards,</Text>
          <Text style={{ fontWeight: 'bold', marginTop: 8 }}>Abhiram</Text>
          <Text>Director</Text>
          <Text style={{ fontWeight: 'bold', color: PRIMARY }}>Sunbird Power Solutions</Text>
          <Text>Mob: 9874561230, 9321456789</Text>
        </View>

        <FooterComponent />
      </Page>

      {/* PAGE 2: PROJECT COST */}
      <Page size="A4" style={styles.page}>
        <HeaderComponent pageTitle="Commercial Proposal" logo={logo} />
        
        <Text style={styles.pageTitle}>PROJECT COST</Text>
        
        <Text style={styles.pageSubtitle}>{data.capacity} KWP ONGRID SOLAR POWER PLANT</Text>

        <View style={styles.table}>
          {/* Header */}
          <View style={[styles.tableRow, styles.tableHeader, { backgroundColor: LIGHT_BG }]}>
            <View style={[styles.colSl, { borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%', justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellBold, styles.cellCenter]}>SL.NO</Text>
            </View>
            <View style={[styles.colPart, { borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%', justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellBold]}>PARTICULARS</Text>
            </View>
            <View style={[styles.colAmt, { justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellBold, styles.cellCenter]}>AMOUNT</Text>
            </View>
          </View>

          {/* Row 1 */}
          <View style={styles.tableRow}>
            <View style={[styles.colSl, { borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%', justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellCenter]}>1</Text>
            </View>
            <View style={[styles.colPart, { borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%', justifyContent: 'center' }]}>
              <Text style={styles.tableCell}>On-Grid System price after subsidy</Text>
            </View>
            <View style={[styles.colAmt, { justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellRight]}>{formatCurrency(calculatedSystemCostAfterSubsidy)}</Text>
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.tableRow}>
            <View style={[styles.colSl, { borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%', justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellCenter]}></Text>
            </View>
            <View style={[styles.colPart, { borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%', paddingVertical: 6 }]}>
              <Text style={styles.tableCell}>MNRE Subsidy Amount shall be credited to the consumer bank account upon submission & completion of solar project</Text>
            </View>
            <View style={[styles.colAmt, { justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellRight]}>{formatCurrency(data.subsidy)}</Text>
            </View>
          </View>

          {/* Row 3 */}
          <View style={styles.tableRowLast}>
            <View style={[styles.colSl, { borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%' }]} />
            <View style={[styles.colPart, { borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%', justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellBold]}>TOTAL SYSTEM COST TO BE PAID BY THE CUSTOMER</Text>
            </View>
            <View style={[styles.colAmt, { justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellBold, styles.cellRed, styles.cellRight]}>{formatCurrency(data.systemCost)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.pageSubtitle}>FOR GRID CONNECTIVITY</Text>

        <View style={styles.table}>
          {/* Row 1 */}
          <View style={styles.tableRow}>
            <View style={[styles.colSl, { borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%', justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellCenter]}>1</Text>
            </View>
            <View style={[styles.colPart, { borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%', paddingVertical: 6 }]}>
              <Text style={styles.tableCell}>Solar Registration Fees 1000+Gst/KW to be paid extra to KSEB and 80% of the amount shall be refundable to customer after 6 months of energization& commissioning.</Text>
            </View>
            <View style={[styles.colAmt, { justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellRight]}>{formatCurrency(data.registrationFee)}</Text>
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.tableRowLast}>
            <View style={[styles.colSl, { borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%' }]} />
            <View style={[styles.colPart, { borderRightWidth: 0.5, borderRightColor: '#000000', minHeight: '100%', justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellBold]}>TOTAL AMOUNT</Text>
            </View>
            <View style={[styles.colAmt, { justifyContent: 'center' }]}>
              <Text style={[styles.tableCell, styles.cellBold, styles.cellRight]}>{formatCurrency(data.totalAmount)}</Text>
            </View>
          </View>
        </View>

        <FooterComponent />
      </Page>

      {/* PAGE 3: TECHNICAL SPECIFICATIONS */}
      <Page size="A4" style={styles.page}>
        <HeaderComponent pageTitle="Technical Specifications" logo={logo} />
        
        <Text style={styles.pageTitle}>DESCRIPTION OF THE PROPOSED ON-GRID SOLAR POWER PLANT</Text>

        <View style={styles.table}>
          {/* Sl 1 */}
          <View style={styles.tableRow}>
            <View style={styles.colSpecParam}><Text style={[styles.tableCell, styles.cellBold]}>1. CAPACITY</Text></View>
            <View style={styles.colSpecVal}><Text style={styles.tableCell}>{data.capacity} KW</Text></View>
          </View>

          {/* Sl 2 */}
          <View style={styles.tableRow}>
            <View style={styles.colSpecParam}><Text style={[styles.tableCell, styles.cellBold]}>2. Project Site</Text></View>
            <View style={styles.colSpecVal}><Text style={styles.tableCell}>{(data.projectSite || "").toUpperCase()}</Text></View>
          </View>

          {/* Sl 3 */}
          <View style={styles.tableRow}>
            <View style={styles.colSpecParam}><Text style={[styles.tableCell, styles.cellBold]}>3. District Name</Text></View>
            <View style={styles.colSpecVal}><Text style={styles.tableCell}>{(data.district || "").toUpperCase()}</Text></View>
          </View>

          {/* Sl 4 */}
          <View style={styles.tableRow}>
            <View style={styles.colSpecParam}><Text style={[styles.tableCell, styles.cellBold]}>4. Type of System</Text></View>
            <View style={styles.colSpecVal}><Text style={styles.tableCell}>{data.systemType || `${data.capacity}KW On-Grid system`}</Text></View>
          </View>

          {/* Sl 5 */}
          <View style={styles.tableRow}>
            <View style={styles.colSpecParam}><Text style={[styles.tableCell, styles.cellBold]}>5. Type of PV modules considered</Text></View>
            <View style={styles.colSpecVal}><Text style={[styles.tableCell, styles.cellRed]}>{(data.panelType || "").toUpperCase()}</Text></View>
          </View>

          {/* Sl 6 */}
          <View style={styles.tableRow}>
            <View style={styles.colSpecParam}><Text style={[styles.tableCell, styles.cellBold]}>6. Solar PV module company</Text></View>
            <View style={styles.colSpecVal}><Text style={[styles.tableCell, styles.cellRed]}>{(data.moduleCompany || "").toUpperCase()}</Text></View>
          </View>

          {/* Sl 7 */}
          <View style={styles.tableRow}>
            <View style={styles.colSpecParam}><Text style={[styles.tableCell, styles.cellBold]}>7. Proposed PV capacity</Text></View>
            <View style={styles.colSpecVal}><Text style={styles.tableCell}>{data.moduleCapacity || `${data.capacity * 1000}Wp`}</Text></View>
          </View>

          {/* Sl 8 */}
          <View style={styles.tableRow}>
            <View style={styles.colSpecParam}><Text style={[styles.tableCell, styles.cellBold]}>8. Projected Module area</Text></View>
            <View style={styles.colSpecVal}><Text style={styles.tableCell}>{data.moduleArea || `${data.capacity * 90}Sqft`}</Text></View>
          </View>

          {/* Sl 9 */}
          <View style={styles.tableRow}>
            <View style={styles.colSpecParam}><Text style={[styles.tableCell, styles.cellBold]}>9. Capacity of each module</Text></View>
            <View style={styles.colSpecVal}><Text style={styles.tableCell}>{data.eachModuleCapacity || "600"}</Text></View>
          </View>

          {/* Sl 10 */}
          <View style={styles.tableRow}>
            <View style={styles.colSpecParam}><Text style={[styles.tableCell, styles.cellBold]}>10. Inverter Make</Text></View>
            <View style={styles.colSpecVal}>
              <Text style={[styles.tableCell, styles.cellRed]}>{(data.inverter || "").toUpperCase()}</Text>
              <Text style={[styles.tableCell, styles.cellRed, { fontSize: 8.5, paddingTop: 0 }]}>{"( 10 YEARS ON – SITE WARRANTY )"}</Text>
            </View>
          </View>

          {/* Sl 11 */}
          <View style={styles.tableRow}>
            <View style={styles.colSpecParam}><Text style={[styles.tableCell, styles.cellBold]}>11. Inverter Capacity</Text></View>
            <View style={styles.colSpecVal}><Text style={styles.tableCell}>{data.inverterCapacity || `${Math.ceil(data.capacity) * 1000} watts`}</Text></View>
          </View>

          {/* Sl 12 */}
          <View style={styles.tableRowLast}>
            <View style={styles.colSpecParam}><Text style={[styles.tableCell, styles.cellBold]}>12. Inverter Model and Capacity</Text></View>
            <View style={styles.colSpecVal}><Text style={styles.tableCell}>{data.inverterModel || `STS-${Math.ceil(data.capacity)}KTL`}</Text></View>
          </View>
        </View>

        <FooterComponent />
      </Page>

      {/* PAGE 4: SYSTEM COMPONENTS */}
      <Page size="A4" style={styles.page}>
        <HeaderComponent pageTitle="Bill of Materials" logo={logo} />
        
        <View style={styles.table}>
          {/* Sl 13 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>13</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>Inverter Totalling</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.inverterTotalling || "30% overloading"}</Text></View>
          </View>

          {/* Sl 14 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>14</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>WIFI Data Logger</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.wifiLogger || "Web connect- Data storage and online monitoring"}</Text></View>
          </View>

          {/* Sl 15 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>15</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>DCDB</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.dcdb || "Mersen/Finder SPD- 600V – 1 nos & Havells/Chint MCB 16 A 500v- 1 nos , Havells 30 A 1000vdc Fuse –1 nos"}</Text></View>
          </View>

          {/* Sl 16 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>16</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>ACDB</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.acdb || "Mersen /Finder AC SPD 320V & L&T/ABB/Havells C32 - 400V"}</Text></View>
          </View>

          {/* Sl 17 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>17</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>DC cable/wire</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.dcCable || "60 Mtr( Microtek/Polycab)"}</Text></View>
          </View>

          {/* Sl 18 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>18</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>Ac cables/wire</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.acCable || "30 Mtr( Microtek/Vguard)"}</Text></View>
          </View>

          {/* Sl 19 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>19</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>Module Mounting Structure</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.mountingStructure || "OPEN TERRACE BASIC STRUCTURE IS CONSIDERED"}</Text></View>
          </View>

          {/* Sl 20 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>20</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>Anchor bolt M8</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.anchorBolt || "CIPY Epoxy + Anchor Bolt"}</Text></View>
          </View>

          {/* Sl 21 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>21</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold ]}>Isolator</Text></View>
            <View style={styles.colCompSpec}><Text style={[styles.tableCell]}>{data.isolator || "32 A – L&T / ABB/Havells"}</Text></View>
          </View>

          {/* Sl 22 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>22</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>PV mounting Bolt</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.pvBolt || "Stainless steel Nut & Bolt"}</Text></View>
          </View>

          {/* Sl 23 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>23</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>Meter Box- 75cm x60 cm</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.meterBox || "1 Nos"}</Text></View>
          </View>

          {/* Sl 24 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>24</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>Earthing Rod & LA</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.earthingLA || "Excel Earthings"}</Text></View>
          </View>

          {/* Sl 25 */}
          <View style={styles.tableRow}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>25</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>Copper wire</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.copperWire || "10 SWG"}</Text></View>
          </View>

          {/* Sl 26 */}
          <View style={styles.tableRowLast}>
            <View style={styles.colCompNo}><Text style={[styles.tableCell, styles.cellCenter]}>26</Text></View>
            <View style={styles.colCompName}><Text style={[styles.tableCell, styles.cellBold]}>Conduit & Fitting</Text></View>
            <View style={styles.colCompSpec}><Text style={styles.tableCell}>{data.conduitFitting || "Ivory /Black ISI"}</Text></View>
          </View>
        </View>

        <FooterComponent />
      </Page>

      {/* PAGE 5: EXCLUSIONS & INCLUSIONS & TERMS */}
      <Page size="A4" style={styles.page}>
        <HeaderComponent pageTitle="Terms & Conditions" logo={logo} />
        
        <Text style={styles.pageTitle}>EXCLUSIONS & INCLUSIONS:</Text>

        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>GST Included in the price (5% for solar module and inverter, 18% for other items and labor).</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>Structure Cost (1m height) Included.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>KSEB Feasibility Charges Included.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>KSEB Registration Fee is Excluded ({data.registrationFee}/-) (80% of the amount is refundable to the Customer from KSEB within 6 months after installation).</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>Solar Meter Charge Included and Net Meter charge included.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>Design Charge is Included.</Text>
          </View>
        </View>

        <Text style={[styles.pageTitle, { marginTop: 25 }]}>TERMS AND CONDITIONS</Text>

        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={styles.bulletText}>The Price quoted by Sunbird Power Solutions along with this quotation is valid for Seven (7) days only.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={[styles.bulletText, { fontWeight: 'bold' }]}>The payment terms applicable are as follows,</Text>
          </View>
          
          <View style={[styles.bulletItem, { paddingLeft: 20 }]}>
            <Text style={styles.bulletDot}>-</Text>
            <Text style={styles.bulletText}>60% advance along with confirmed work order.</Text>
          </View>
          <View style={[styles.bulletItem, { paddingLeft: 20 }]}>
            <Text style={styles.bulletDot}>-</Text>
            <Text style={styles.bulletText}>30% after material delivery.</Text>
          </View>
          <View style={[styles.bulletItem, { paddingLeft: 20 }]}>
            <Text style={styles.bulletDot}>-</Text>
            <Text style={styles.bulletText}>10% after installation and commissioning</Text>
          </View>

          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={styles.bulletText}>All access and Permits shall be provided by the customer.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={styles.bulletText}>The Customer must not interrupt the works, and/ or shall abstain from any act or omission of which it can reasonably be expected that it may delay the works or make the works more difficult and or expensive for Sunbird Power Solutions, shall be chargeable.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={styles.bulletText}>Supply & Delivery of materials: Within 1 week from the date of receipt of the work order from the client.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={styles.bulletText}>Installation: - Within 1 week after delivery of complete materials.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={styles.bulletText}>Commissioning: - Within 2 weeks, If net meter is included, but subject to Electrical Inspectorate & KSEB Official’s availability.</Text>
          </View>
        </View>

        <FooterComponent />
      </Page>

      {/* PAGE 6: TERMS & WARRANTY */}
      <Page size="A4" style={styles.page}>
        <HeaderComponent pageTitle="Warranty & Services" logo={logo} />
        
        <View style={[styles.bulletList, { marginTop: 10 }]}>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={styles.bulletText}>Union interference/ Local labor issues shall be sorted out by the client.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={styles.bulletText}>Customer shall be responsible for Safety & Security of the materials until handing over of the same to Sunbird Power Solutions designated personnel for installation.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={styles.bulletText}>This techno commercial proposal for installation of solar photovoltaic system constitutes confidential and proprietary information of Sunbird Power Solutions and shall not be disclosed to a third party.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={styles.bulletText}>Any modification due to non-conformity of KSEB /Central /Kerala Govt. standards will have to carried by the customer (Immediate changes).</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={styles.bulletText}>Customer needs to pay additional amount if anything not included in quotation. We are quoted reputed products available on the market.</Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>*</Text>
            <Text style={styles.bulletText}>Natural calamities not included in any product warranty.</Text>
          </View>
        </View>

        <Text style={[styles.pageTitle, { marginTop: 30 }]}>WARRANTY & SERVICES</Text>

        <View style={styles.bulletList}>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={[styles.bulletText, { fontWeight: 'bold' }]}>
              Solar Inverter warranted by company <Text style={{ color: PRIMARY }}>{data.inverter.toUpperCase()}</Text>: - <Text style={{ color: PRIMARY }}>10 Years.</Text>
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={[styles.bulletText, { fontWeight: 'bold' }]}>
              Solar PV Modules: <Text style={{ color: PRIMARY }}>{data.moduleCompany.toUpperCase()}</Text> (As per MNRE standard) <Text style={{ color: PRIMARY }}>12-year Manufacturer’s warranty</Text> and <Text style={{ color: PRIMARY }}>25/ 30 -year performance warranty</Text> as mentioned by the Solar PV Modules Manufacturers (Provided directly by the Solar PV Modules / Panels Manufacturers).
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={[styles.bulletText, { fontWeight: 'bold' }]}>
              Service - <Text style={{ color: PRIMARY }}>5 Years Free service</Text>, panel washing not included.
            </Text>
          </View>
        </View>

        <FooterComponent />
      </Page>

      {/* PAGE 7: BANK DETAILS & SIGNATURES */}
      <Page size="A4" style={styles.page}>
        <HeaderComponent pageTitle="Proposal Confirmation" logo={logo} />
        
        <View style={{ marginTop: 15, fontSize: 10 }}>
          <Text>In case of any further Information/Clarification, please feel free to contact us.</Text>
          <Text style={{ marginTop: 8 }}>Thanking you and assuring you of our best services.</Text>
        </View>

        <View style={styles.sigSection}>
          <View style={styles.sigBlock}>
            <Text style={styles.sigText}>Accepted all the condition mentioned above</Text>
            <View style={styles.sigLine} />
            <Text style={styles.sigLabel}>Signature</Text>
          </View>

          <View style={[styles.sigBlock, { alignItems: 'flex-end', paddingRight: 20 }]}>
            <Text style={styles.sigText}>For Sunbird Power Solutions</Text>
            <View style={[styles.sigLine, { width: '70%' }]} />
            <Text style={styles.sigLabel}>Authorized Signatory</Text>
          </View>
        </View>

        <Text style={[styles.pageSubtitle, { marginTop: 35 }]}>OUR BANK DETAILS</Text>

        <View style={styles.bankTable}>
          {/* Row 1 */}
          <View style={styles.tableRow}>
            <View style={styles.colBankLabel}><Text style={[styles.tableCell, styles.cellBold]}>BANK</Text></View>
            <View style={styles.colBankVal}><Text style={styles.tableCell}>XXXXXXXXX</Text></View>
          </View>
          {/* Row 2 */}
          <View style={styles.tableRow}>
            <View style={styles.colBankLabel}><Text style={[styles.tableCell, styles.cellBold]}>BRANCH</Text></View>
            <View style={styles.colBankVal}><Text style={styles.tableCell}>Kozhikode</Text></View>
          </View>
          {/* Row 3 */}
          <View style={styles.tableRow}>
            <View style={styles.colBankLabel}><Text style={[styles.tableCell, styles.cellBold]}>ACCOUNT NUMBER</Text></View>
            <View style={styles.colBankVal}><Text style={[styles.tableCell, styles.cellBold, { color: PRIMARY }]}>XXXXXXXXXXXX</Text></View>
          </View>
          {/* Row 4 */}
          <View style={styles.tableRow}>
            <View style={styles.colBankLabel}><Text style={[styles.tableCell, styles.cellBold]}>ACCOUNT NAME</Text></View>
            <View style={styles.colBankVal}><Text style={styles.tableCell}>Sunbird Power Solutions</Text></View>
          </View>
          {/* Row 5 */}
          <View style={styles.tableRowLast}>
            <View style={styles.colBankLabel}><Text style={[styles.tableCell, styles.cellBold]}>IFSC CODE</Text></View>
            <View style={styles.colBankVal}><Text style={styles.tableCell}>XXXXXXXXXX</Text></View>
          </View>
        </View>

        <FooterComponent />
      </Page>

    </Document>
  );
}
