// EstimatePdfStyles.js
import { StyleSheet } from '@react-pdf/renderer';
const maxWidth = 760; // Maximum width
const colXL12Width = maxWidth; // colXL12 represents the maximum size

const colXL1Width = maxWidth / 12;
const colXL2Width = colXL1Width * 2;
const colXL3Width = colXL1Width * 3;
const colXL4Width = colXL1Width * 4;
const colXL6Width = colXL1Width * 6;
const colXL7Width = colXL1Width * 7;
const colXL8Width = colXL1Width * 8;
const colXL9Width = colXL1Width * 9;

const s = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 10,
        
      },
  containerFluid: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding:20,
    marginHorizontal : "15px"
   
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 10,  
    
   
  },
  col1: {
    width: '42.5em', 
  },
  col2: {
    width: '85em', 
  },
  col3: {
    width: '127.5em', 
  },
  col4: {
   
    width: '170em',
  },
  col6: {
    width: '255em',
  },
  col7: {
    width: '297.5em',
  },
  col8: {
    width: '340em', 
  },
  col9: {
    width: '382.5em', 
  },
  col12: {

    width: '510em', 
  },
  colXL1: {
    width: `${colXL1Width}em`,
  },
  colXL2: {
    width: `${colXL2Width}em`,
  },
  colXL3: {
    width: `${colXL3Width}em`,
  },
  colXL4: {
    width: `${colXL4Width}em`,
  },
  colXL6: {
    width: `${colXL6Width}em`,
  },
  colXL7: {
    width: `${colXL7Width}em`,
  },
  colXL8: {
    width: `${colXL8Width}em`,
  },
  colXL9: {
    width: `${colXL9Width}em`,
  },
  colXL12: {
    width: `${colXL12Width}em`,
  },

  borderLight: {
    border: "1px solid #CCCCCC" 
  },
  textEnd: {
    textAlign: 'right',
  },
  textStart: {
    textAlign: 'left',
  },
  textCenter: {
    textAlign: 'center',
  },
  title: {
    fontSize: "18px",
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading: {
    fontSize: "14px",
    fontWeight: 'bold',
    marginBottom: 1,
  },
  text: {
    fontSize: "12pt",
    marginBottom: 1,
  },
  text2: {
    fontSize: "10pt",
    marginBottom: 1,
  },
  tblHeading: {
    fontSize: "12pt",
    marginBottom: 4,
    marginTop : 4,
  },
  tblText: {
    fontSize: "10pt",
    marginBottom: 4,
    marginTop : 4,
  },
  small: {
    fontSize: "7px",
    marginBottom: 1 ,
  },
});

export default s;
