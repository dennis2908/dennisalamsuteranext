import { Card, CardBody, CardHeader, CardFooter } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React, { useRef,useMemo }  from 'react'

import useStateRef from 'react-usestateref'
import Layout from 'Layouts';
import {storeLogin} from 'components/redux/storeLogin';
import Grid from '@material-ui/core/Grid';

import { green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import ListIcon from '@material-ui/icons/List';
import LaunchIcon from '@material-ui/icons/Launch';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NativeSelect from '@material-ui/core/NativeSelect';

import Input from '@material-ui/core/Input';

import { red } from '@material-ui/core/colors';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import LinearProgress from '@material-ui/core/LinearProgress';

import { useRouter } from 'next/router';


const columns = [
  
  {
    id: 'btn',
    label: 'Action',
    minWidth: 380,
    align: 'center',
    format: (value) => this.btn,
  },
  { id: 'customer_cc', label: 'Customer Code - Name', minWidth: 170 },
  { id: 'tot_byrM', label: 'Total Bayar', align: 'right',minWidth: 170 },
];

function btn(){
	
	return '<Button variant="outlined" color="secondary">Secondary</Button>'
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Order_list() {
	
  const [open, setOpen] = React.useState(false);
  
  const [rows, setrows] = React.useState([]);
  
  const [seldata, setseldata] = React.useState([]);
  
  const [selcustomer, setselcustomer] = React.useState([]);

  const [visibleBrg, setvisibleBrg] = React.useState([]);
  
  const [priceChange, setpriceChange] = React.useState([]);
  
  const [qtyChange, setqtyChange] = React.useState([]);
  
  const [totChange, settotChange] = React.useState([]);
  
  const [brgChange, setbrgChange] = React.useState([]);
  
  const [countBrg, setcountBrg] = React.useState(1);
  
  const [OpenDetailDil, setOpenDetailDil] = React.useState(false);

  const [OpenDelDil, setOpenDelDil] = React.useState(false);
  
  const [FormData, setFormData] = React.useState({"name":""});
  
  const arrDataSel = useMemo(() => Array(countBrg).fill(0).map(i=> React.createRef()), []);
  
  const [BtnDilSE, setBtnDilSE] = React.useState({});

  const [ShowHideLin, setShowHideLin] = React.useState({display:"block"});
  
  const [DialogSEtitle, setDialogSEtitle] = useStateRef("New Data Order");
  
  const [IconSEtitle, setIconSEtitle] = React.useState(<AddIcon style={{marginBottom:-4}} color="primary"/>);
  
  const brgBrgRef = useRef([]);
  
  const brgPriceRef = useRef([]);
  
  const brgTotalRef = useRef([]);
  
  const brgQtyRef = useRef([]);
  
  const totalPay = useRef();
  
  const customer_phone = useRef();
  
  const customer_add = useRef();
  
  const customer_id = useRef();

  const DangerButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
  }))(Button);
  
  const router = useRouter(); 
  
  React.useEffect(async() => {
	  
	  var roleAss = Object.assign({},storeLogin.getState().authRoleAssign);
      let cektorder = Object.values(roleAss).find((obj) => {
        return obj === "torder"
      });
      if(!cektorder)
		router.push("/dashboard")
	  brgBrgRef.current = brgBrgRef.current.slice(0, countBrg);
	  brgPriceRef.current = brgPriceRef.current.slice(0, countBrg);
	  brgTotalRef.current = brgTotalRef.current.slice(0, countBrg);
	  brgQtyRef.current = brgQtyRef.current.slice(0, countBrg);
	  await dataSel();
	  await dataCus();
	  await loadData();
	}, []);		
  const loadData = async(e) => {
	  await DoShowLin()
	  await fetch("http://127.0.0.1:8441/api/order", {
		  method: "GET",
		  headers: {"Authorization" : "Bearer "+storeLogin.getState().authLogin}
				}).then(res => res.json())
			  .then(
				(result) => {
					if(result.result){
						let data = result.result;
						for (var i = 0; i < data.length; i++) {
							if(result.result[i].tot_byr){
								result.result[i].tot_byrM = formatRupiah(result.result[i]['tot_byr'], 'Rp. ');
								
							}
							
						}
						setrows(result.result);
					}
					
				
			});
			await DoHideLin()	
	 
  }

  const DoShowLin = async(e) => {
    setShowHideLin({display:"block"})
  }

  const DoHideLin = async(e) => {
    setShowHideLin({display:"none"})
  }
  
  const dataSel = async(e) => {
	  await fetch("http://127.0.0.1:8441/api/barang", {
		  method: "GET",
		  headers: {"Authorization" : "Bearer "+storeLogin.getState().authLogin}
				}).then(res => res.json())
			  .then(
				(result) => {
					setseldata(result.result);
					
				
			});
	 
  }
  
  const dataCus = async(e) => {
	  await fetch("http://127.0.0.1:8441/api/customer", {
		  method: "GET",
		  headers: {"Authorization" : "Bearer "+storeLogin.getState().authLogin}
				}).then(res => res.json())
			  .then(
				(result) => {
					setselcustomer(result.result);
					
				
			});
	 
  }

  const delItemOrder = async() => {
	await fetch("http://127.0.0.1:8441/api/order/"+FormData.id, {
	method: "DELETE",
	headers: {"Authorization" : "Bearer "+storeLogin.getState().authLogin}
			  }).then(res => res.json())
			.then(
			  (result) => {
		loadData();
		handleCloseDelDil();
		  });
   
}
  
  const saveUpdateData = (e) => {
	  e.preventDefault()
	  let FormDt = {}
	  let arr_brg = ''
	  let arr_price = ''
	  let arr_tot = ''
	  let arr_qty = ''
	  brgTotalRef.current.forEach((k,v) => {
				
		if(typeof k !== 'undefined'){
			if(k!==null){
				if(typeof k.value !== 'undefined'){
					if(k.value){
						let val = k.name.replace( /[^\d.]/g, '' )
						arr_price+=brgPriceRef.current[val].value+","
						arr_qty+=brgQtyRef.current[val].value+","
						arr_brg+=brgBrgRef.current[val].value+","
						arr_tot+=k.value+","	
					}
						
					
					
				}
			}
		}
	   
	})
			FormDt.customer_id = customer_id.current.value
			FormDt.tot_byr = totalPay.current.value
			FormDt.arr_tot = arr_tot.substring(0, arr_tot.length - 1);
			FormDt.arr_brg = arr_brg.substring(0, arr_brg.length - 1);
			FormDt.arr_price = arr_price.substring(0, arr_price.length - 1);
			FormDt.arr_qty = arr_qty.substring(0, arr_qty.length - 1);
			console.log(FormDt);
	  if(typeof FormData.id === 'undefined'){
	  fetch("http://127.0.0.1:8441/api/order", {
						  method: "POST",
						  headers: {
							  'Accept': 'application/json',
							  'Content-Type': 'application/json',
							  'Access-Control-Allow-Headers':'*',
							  "Authorization" : "Bearer "+storeLogin.getState().authLogin
							},
							body: JSON.stringify(FormDt)
								}).then(
								(result) => {
									loadData()
									handleClose()
									
							});
							  
	  }						
	  else{
		  
		  fetch("http://127.0.0.1:8441/api/order/"+FormData.id, {
						  method: "PUT",
						  headers: {
							  'Accept': 'application/json',
							  'Content-Type': 'application/json',
							  'Access-Control-Allow-Headers':'*',
							  "Authorization" : "Bearer "+storeLogin.getState().authLogin
							},
							body: JSON.stringify(FormDt)
								}).then(res => res.json())
							  .then(
								(result) => {
									loadData()
									handleClose()
									
							});
	  }
	e.preventDefault()						
	 
  }

  const handleClickOpen = (data) => {
	setOpen(true);
	let arr_brg = data.arr_brg.split(',')
	let arr_tot = data.arr_tot.split(',')
	let arr_qty = data.arr_qty.split(',')
	let arr_price = data.arr_price.split(',')
	setcountBrg(arr_brg.length)
	setFormData(data);
	setDialogSEtitle("Edit Data Order")
	setIconSEtitle(<CreateIcon style={{marginBottom:-4}} color="primary"/>)
	setBtnDilSE('Update')
	let priceChangeM = []
	let totChangeM = []
	let qtyChangeM = []
	let brgChangeM = []
    arr_brg.forEach((k, v) => {
		console.log(v)
		priceChangeM.push(arr_price[v])
		totChangeM.push(arr_tot[v])
		qtyChangeM.push(arr_qty[v])
		brgChangeM.push(arr_brg[v])
		
	})	
	setpriceChange(priceChangeM)
	settotChange(totChangeM)
	setqtyChange(qtyChangeM)
	setbrgChange(brgChangeM)
	
  };
  
  const myChange = (event) => {
	var keynum
    if(window.event) {// IE8 and earlier
       keynum = event.keyCode;
    } else if(event.which) { // IE9/Firefox/Chrome/Opera/Safari
       keynum = event.which;
    } else {
       keynum = 0;
    }

    if(keynum === 8 || keynum === 0 || keynum === 9) {
        return;
    }
    if(keynum < 46 || keynum > 57 || keynum === 47) {
        event.preventDefault();
    } 
  }
  
  const addBarang = () => {
	  let cnt = countBrg+1;
	  console.log(cnt);
	  brgBrgRef.current = brgBrgRef.current.slice(0, cnt);
	  brgPriceRef.current = brgPriceRef.current.slice(0, cnt);
	  brgTotalRef.current = brgTotalRef.current.slice(0, cnt);
	  brgQtyRef.current = brgQtyRef.current.slice(0, cnt);
	  setpriceChange([])
	  settotChange([])
	  setqtyChange([])
	  setbrgChange([])
	  setcountBrg((cnt));
  };
  
  const databarangSel = async() => {
	  let data = await fetch("http://127.0.0.1:8441/api/barang", {
		  method: "GET"
				}).then(res => res.json());
	  
	  return data;		
  };
  
  const onFieldChange = (fieldName)=>{
	    return function (event) {
			
			FormData[fieldName] = event.target.value
			console.log(FormData)
			setFormData(FormData);
        }
   }
	
  const onFieldSelChange = (fieldName)=>{
	    return function (event) {
			console.log(fieldName);
			let seldataX = seldata.filter(function (seldata) { return seldata.id == event.target.value });
			brgPriceRef.current[fieldName].value  = seldataX[0]['price']
			let totPrice = 0
			brgTotalRef.current[fieldName].value  = brgPriceRef.current[fieldName].value*brgQtyRef.current[fieldName].value
			brgTotalRef.current.forEach((k, v) => {
				
				if(typeof k !== 'undefined'){
					if(k!==null){
						if(typeof k.value !== 'undefined'){
							if(k.value){
								totPrice += parseInt(k.value)	
							}
								
							
							
						}
					}
				}
			   
			})
			totalPay.current.value = parseInt(totPrice)
		}
  }

const onFieldCusChange = (event)=>{
	if(event.target.value){
	  let seldataX = selcustomer.filter(function (selcustomer) { return selcustomer.id == event.target.value });
	  customer_add.current.value  = seldataX[0]['address']
	  customer_phone.current.value  = seldataX[0]['phone']
	}
	else{
		customer_add.current.value  = ""
	    customer_phone.current.value  = ""
	}
  }  
  
  const onFieldQtyChange = (fieldName)=>{
	    return function (event) {
			let totPrice = 0
			
			brgTotalRef.current[fieldName].value  = brgPriceRef.current[fieldName].value*event.target.value
			brgTotalRef.current.forEach((k, v) => {
				
				if(typeof k !== 'undefined'){
					if(typeof k.value !== 'undefined'){
						if(k.value){
							totPrice += parseInt(k.value)	
						}
							
						
						
					}
				}
			   
			})
			totalPay.current.value = parseInt(totPrice)
		}
  }
  
  const openNewForm = () => {
	setOpen(true);
	setFormData({});
	setcountBrg(1)
	setIconSEtitle(<AddIcon style={{marginBottom:-4}} color="primary"/>)
	setDialogSEtitle("New Order")
	setBtnDilSE('Save')
	brgBrgRef.current = brgBrgRef.current.slice(0, countBrg);
	brgPriceRef.current = brgPriceRef.current.slice(0, countBrg);
	brgTotalRef.current = brgPriceRef.current.slice(0, countBrg);
	brgQtyRef.current = brgQtyRef.current.slice(0, countBrg);
  };
  
  const OpenDetailSE = (data) => {
	setFormData(data);  
	setOpenDetailDil(true);
	let arr_brg = data.arr_brg.split(',')
	let arr_tot = data.arr_tot.split(',')
	let arr_qty = data.arr_qty.split(',')
	let arr_price = data.arr_price.split(',')
	setcountBrg(arr_brg.length)
	let priceChangeM = []
	let totChangeM = []
	let qtyChangeM = []
	let brgChangeM = []
    arr_brg.forEach((k, v) => {
		console.log(v)
		priceChangeM.push(arr_price[v])
		totChangeM.push(arr_tot[v])
		qtyChangeM.push(arr_qty[v])
		brgChangeM.push(arr_brg[v])
		
	})	
	setpriceChange(priceChangeM)
	settotChange(totChangeM)
	setqtyChange(qtyChangeM)
	setbrgChange(brgChangeM)
  };
  
  const OpenDeleteSE = async(data) => {
    await setFormData(data);  
    await setOpenDelDil(true);
  };

  const delItem = async(x) => {
	let visibleBrgX = visibleBrg
	let visibleBrgY = visibleBrgX.concat("item"+x)
	totalPay.current.value -= brgTotalRef.current[x].value
	await setvisibleBrg(visibleBrgY)
  };

  const handleClose = () => {
	loadData()
    setOpen(false);
  };	

  const handleCloseDelDil = () => {
	loadData()
  	setOpenDelDil(false);
  };
  
  const formatRupiah = (angka, prefix) => {
	return prefix+" "+ angka.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").replace(".","-").replace(/,/g, '.').replace("-",",");
  }
  
  const handleCloseDetailDil = (data) => {
    setOpenDetailDil(false);
  };
  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
	  let dataItem =   [];
	  let dataItemDetail =   [];
	  let dataItemSel =   [];
      dataItemSel =   [<option value='' key={String("cus0") + String("cus0")}>== Pilih Item ==</option>];
	  if(seldata){
		  seldata.forEach((k, v) => {
			   dataItemSel.push(<option value={k.id} key={String(k.id+"selData")}>{k.name}</option>);	
		  })
	  }
	  else{
		  dataItemSel.push(<option>Pilih Data</option>)
	  }
	  
	  let dataSelCus =   [];
      dataSelCus =   [<option value='' key={String("0cus") + String("0cus")}>== Pilih Customer ==</option>];
	  if(selcustomer){
		  selcustomer.forEach((k, v) => {
			   dataSelCus.push(<option value={k.id} key={String(k.id+"cus")}>{k.code} - {k.name}</option>);	
		  })
	  }
	  
	  for(let i=0;i<countBrg;i++){
		  var data = visibleBrg.includes("item"+i)
		  let btn = []
		  if(i!=0){
				 btn.push(<Button key={String(i+"lll") + String(i+"lll")} variant="contained"  color="secondary" onClick={() => delItem(i)}>X</Button>)
		  }	
		  if(!data){
			  dataItem.push(
		   <div key={String(i+"dataSel") + String(i+"dataSel")} style={{marginBottom:20}}>
		    <NativeSelect
			defaultValue={brgChange[i]}
			inputRef={el => brgBrgRef.current[i] = el} 
			name= {'brg'+i}
		  	required
		  	onChange={onFieldSelChange(i).bind(this)}
		  	style={{width:160,marginRight:10}}
        >
		{dataItemSel}
        </NativeSelect>
		<TextField
		    	  inputRef={el => brgPriceRef.current[i] = el} 
				  rows="4"
				  fullWidth
				  variant="outlined"
				  placeholder="Price"
				  defaultValue={priceChange[i]}
				  style={{width:95,marginRight:10}}
				  inputProps={{
					style: {textAlign: 'right'},
					readOnly:true
					}}
				  name={"price"+i}
				/>
		<TextField
		          type="number"
				  required
				  label="Qty"
				  defaultValue={qtyChange[i]}
				  name={"qty"+i}
				  rows="4"
				  variant="outlined"
				  inputRef={el => brgQtyRef.current[i] = el} 
				  style={{width:75,marginRight:10}}
				  inputProps={{
              style: {textAlign: 'right'}
			  }}
			  onKeyDown={(e) => myChange(e)}
			  onChange={onFieldQtyChange(i).bind(this)}
				/>
        <TextField
		    	  inputRef={el => brgTotalRef.current[i] = el} 
				  name={"tot"+i}
				  fullWidth
				  variant="outlined"
				  placeholder="Total"
				  defaultValue={totChange[i]}
				  style={{width:100,marginRight:10}}
				  inputProps={{
              style: {textAlign: 'right'},
			  readOnly:true
			  }}
				/>				
				{btn}
		 </div>
		
        );
		
		dataItemDetail.push(
		   <div key={String(i+"dataSel") + String(i+"dataSel")} style={{marginBottom:20}}>
		    <NativeSelect
			defaultValue={brgChange[i]}
			inputRef={el => brgBrgRef.current[i] = el} 
		    disabled
			style={{width:160,marginRight:10}}
        >
		{dataItemSel}
        </NativeSelect>
		<TextField
		    	  inputRef={el => brgPriceRef.current[i] = el} 
				  fullWidth
				  variant="outlined"
				  placeholder="Price"
				  defaultValue={priceChange[i]}
				  style={{width:95,marginRight:10}}
				  inputProps={{
					style: {textAlign: 'right'},
					readOnly:true
				  }}
				  name={"price"+i}
				/>
		<TextField
		          label="Qty"
				  defaultValue={qtyChange[i]}
				  variant="outlined"
				  inputRef={el => brgQtyRef.current[i] = el} 
				  style={{width:75,marginRight:10}}
				  inputProps={{
					style: {textAlign: 'right'},
					readOnly:true
				  }}
				/>
        <TextField
		    	  inputRef={el => brgTotalRef.current[i] = el} 
				  fullWidth
				  variant="outlined"
				  placeholder="Total"
				  defaultValue={totChange[i]}
				  style={{width:100,marginRight:10}}
				  inputProps={{
					readOnly:true,
					style: {textAlign: 'right'}
			      }}
				/>
		 </div>
		
        );
		
		  }
		   	
	  }
  return (
    <Layout title="List Order">
      <Row>
        <Col breakPoint={{ xs: 24, md: 12 }}>
          <Card status="Primary" accent="Info">
            <CardHeader><ListIcon style={{marginBottom:-7}} color="primary"/> DATA ORDER <Button 
			style={{marginLeft:30}}
			onClick={() => openNewForm()}
			variant="contained" color="primary">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg> &nbsp;Add Data
</Button></CardHeader>
            <CardBody>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
		<div style={{fontSize:24,marginBottom:20}}>
		{IconSEtitle}{DialogSEtitle}</div>
          <form autoComplete="off" onSubmit={(e) => saveUpdateData(e)}>
		       <NativeSelect
		  inputProps={{
            name: 'customer_id',
            id: 'customer_id',
          }}
		  defaultValue={FormData.customer_id}
		  inputRef={customer_id}
		  required
		  fullWidth
		  onChange={() => onFieldCusChange(event)}
		  style={{marginBottom:20}}
        >
		{dataSelCus}
        </NativeSelect>
		<TextField
		    	  inputRef={customer_phone}
				  variant="outlined"
				  defaultValue={FormData.phone}
				  placeholder="Phone"
				  fullWidth
				  style={{marginBottom:20}}
				  inputProps={{
				  disabled:"disabled"
				}}
				/>
		<TextField
		    	  inputRef={customer_add}
				  variant="outlined"
				  defaultValue={FormData.address}
				  placeholder="Address"
				  fullWidth
				  style={{marginBottom:20}}
				  inputProps={{
				  disabled:"disabled"
				}}
				/>
		       <div><Button style={{marginBottom:20}} variant="contained" color="secondary" onClick={addBarang}>
				  Add Item
				</Button>
			   </div> 
		      {dataItem}
			  <TextField
			      required
		    	  rows="4"
				  fullWidth
				  variant="outlined"
				  name="tot_byr"
				  placeholder="Total Pay"
				  inputRef={totalPay}
				  defaultValue={FormData.tot_byr}
				  style={{marginRight:10,marginBottom:10}}
				  inputProps={{
              style: {textAlign: 'right'},
			  disabled:"disabled"
			  }}
				/>
					<Button type="submit"  variant="contained" color="primary">
						{BtnDilSE}
				  </Button>
		</form>
        </DialogContent>
        <DialogActions>
          <Button type="button"  onClick={handleClose} color="primary">
            Cancel
          </Button>
         
        </DialogActions>
      </Dialog>
	  
      <Dialog open={OpenDelDil} onClose={handleCloseDelDil} aria-labelledby="form-dialog-title">
        <DialogContent><div style={{fontSize:24,marginBottom:20}}>
		       Confirmation Delete</div>
        Do you want to delete this item ?
        </DialogContent>
        <DialogActions>
          <DangerButton onClick={delItemOrder}>
            OK
          </DangerButton>
          <Button onClick={handleCloseDelDil} color="primary">
            close
          </Button>
         
        </DialogActions>
      </Dialog>

	  <Dialog open={OpenDetailDil} onClose={handleCloseDetailDil} aria-labelledby="form-dialog-title">
        <DialogContent><div style={{fontSize:24,marginBottom:20}}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg> Detail Data Order</div>
       <NativeSelect
		  defaultValue={FormData.customer_id}
		  inputRef={customer_id}
		  fullWidth
		  style={{marginBottom:20}}
		  disabled
        >
		{dataSelCus}
        </NativeSelect>
		<TextField
		    	  inputRef={customer_phone}
				  variant="outlined"
				  defaultValue={FormData.phone}
				  placeholder="Phone"
				  fullWidth
				  style={{marginBottom:20}}
				  inputProps={{
                    readOnly:true
			      }}
				/>
		<TextField
		    	  inputRef={customer_add}
				  variant="outlined"
				  defaultValue={FormData.address}
				  placeholder="Address"
				  fullWidth
				  style={{marginBottom:20}}
				  inputProps={{
                    readOnly:true
			      }}
				/>
				
				{dataItemDetail}
				<TextField
			      fullWidth
				  variant="outlined"
				  name="tot_byr"
				  placeholder="Total Pay"
				  defaultValue={FormData.tot_byr}
				  style={{marginRight:10,marginBottom:10}}
				  inputProps={{
                    style: {textAlign: 'right'},
					readOnly:true
			      }}
				/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDil} color="primary">
            close
          </Button>
         
        </DialogActions>
      </Dialog>
	  
			<Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id+"tbltbl"}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >

                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={String(row.id)+"hover"}>
                  {columns.map((column) => {
                    if(column.id==="btn")
					{
						return (
                      <TableCell key={String(column.id)+"tableData"} align={column.align}>
					    <Button style={{marginRight:10}} variant="contained" color="inherit" onClick={() => OpenDetailSE(row)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
  <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
</svg>&nbsp;
						  Detail
						</Button>
                        <Button variant="contained" style={{marginRight:10}} color="secondary" onClick={() => handleClickOpen(row)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>&nbsp;
						  Edit
						</Button>
            <DangerButton variant="contained" onClick={() => OpenDeleteSE(row)}>
						<svg width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>&nbsp;
						  Delete
						</DangerButton>
                      </TableCell>
					  
                    );
					}
					else{					
						const value = row[column.id];
						return (
						  <TableCell key={String(column.id)+"tableData"} align={column.align}>
							{column.format && typeof value === 'number' ? column.format(value) : value}
						  </TableCell>
						  
						);
					}
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
			</CardBody>
            <CardFooter><LinearProgress style={ShowHideLin}/></CardFooter>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
