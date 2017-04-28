console.log("sesonal-sales.js has loaded");

const seasonalDis= document.getElementById('seasonal_discount');
var discount= 1;
var data;
var showData;
var categories;
var selected;
var catObj;
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
function showData(data){
	console.log(data);
	var output= document.getElementById('output');
	var topDiv="<div>"+"<h2>"+ "Prodcuts" +"</h2>";
	var divCont="";
	var xObj =data.products;
	console.log(xObj);
	var seasDis= seasonalDis.value;
	for (var i=0; i<xObj.length; i++){
		var prod= xObj[i];
		var price= prod.price;
		if(prod.category_id === 1|| seasDis==1){
			divCont+= "<h4>" +"Apparel" + "</h4>"+
			"<br>" +
			"<span>"+ prod.name+ ": " + price+ "</span>" +
			"<hr>";
		} else if(prod.category_id === 2 || seasDis==2){
			divCont+= "<h4>" + "Furniture" + "</h4>"+
			"<br>"+
			"<span>"+ prod.name+ ": " + price+ "</span>"+
			"<hr>";
		}else if(prod.category_id === 3 || seasDis==3){
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
	var categories= JSON.parse(event.target.responseText);
	catObj= changeData(categories);
	console.log(categories);
	
};

function depotRequestFail(event){
	console.log("An error has occured");
};


depotRequest.open('GET', "depot.json");
depotRequest.send();
seasonalDis.addEventListener('change', applyDiscount);
function applyDiscount(x){
	var seasDis= seasonalDis.value;
	console.log(seasDis);
	//return seasDis;
	for (var i=0; i<seasonalDis.length; i++){
	if(seasonalDis.options[seasonalDis.selectedIndex]){
		selected= seasonalDis.options[seasonalDis.selectedIndex].value;
		console.log(selected);
		break;
	}
	if(selected== "Spring"){
		discount= catObj[0].discount;
	}else if(selected== "Autumn"){
		discount= catObj[1].discount;
	}else if(selected== "Winter"){
		discount= catObj[2].discount;
	}else{
		discount=1;
	}
}
	showData(data);
}

function changeData(data){
	catObj= data.categories;
	return catObj;
	console.log(catObj);
}




