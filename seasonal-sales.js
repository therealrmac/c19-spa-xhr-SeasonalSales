console.log("sesonal-sales.js has loaded");

const seasonalDis= document.getElementById('seasonal_discount');
var discount= 1;
var catObj;
var data;


productRequest= new XMLHttpRequest();

productRequest.addEventListener('load', productRequestLoad);
productRequest.addEventListener('error', productRequestFail);

function productRequestLoad(event){
	console.log("Products loaded");
	var data= JSON.parse(event.target.responseText);
	console.log(data);
	showData(data);
};
function productRequestFail(event){
	console.log("An error has occured");
};
function showData(x){
	var output= document.getElementById('output');
	var topDiv="<div>"+"<h2>"+ "Prodcuts" +"</h2>";
	var divCont="";
	for (var i=0; i<x.products.length; i++){
		console.log(x.products);
		var prod= x.products[i];
		var price= prod.price * discount;
		if(prod.category_id ===1){
			divCont+= "<h4>" +"Apparel" + "</h4>"+
			"<br>" +
			"<span>"+ prod.name+ ": " + price+ "</span>" +
			"<hr>";
		} else if(prod.category_id === 2){
			divCont+= "<h4>" + "Furniture" + "</h4>"+
			"<br>"+
			"<span>"+ prod.name+ ": " + price+ "</span>"+
			"<hr>";
		}else if(prod.category_id === 3){
			divCont+= "<h4>" + "Household" + "</h4>"+
			"<br>"+
			"<span>"+ prod.name+ ": " + price+ "</span>"+
			"<hr>";
		}
	}
	topDiv += divCont
	output.innerHTML += topDiv;
};

productRequest.open("GET", "products.json");
productRequest.send();

depotRequest= new XMLHttpRequest();

depotRequest.addEventListener('load', depotRequestLoad);
depotRequest.addEventListener('error', depotRequestFail);

function depotRequestLoad(event){
	console.log('Department has loaded');
	var depotData= JSON.parse(event.target.responseText);
	console.log(depotData);
	var catObj =makeData(depotData);
};

function depotRequestFail(event){
	console.log("An error has occured");
};

function makeData(x){
	catObj= x.categories;
	console.log(catObj);
	return catObj;
}
depotRequest.open('GET', "depot.json");
depotRequest.send();
seasonalDis.addEventListener('change', applyDiscount);
function applyDiscount(x){
	var seasDis= seasonalDis.value;
	for (var i=0; i< catObj.length; i++){
		if(seasDis==1 ){
			discount= catObj[0].discount;
		}else if(seasDis ==2){
			discount= catObj[1].discount;
		}else if(seasDis==3){
			discount= catObj[2].discount;
		}else {
			discount=1;
		}
	}
	showData(data);
}