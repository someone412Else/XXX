
;(function () {
	const dataArray = [];

	function binHandler(cat, art, price) {
		let product = new binConstructor(cat, art, price);
		dataArray.push(product);
		console.log(dataArray);
		showArray(product);
		getNumm(dataArray);
		getSumm(dataArray);
	};

	function binConstructor (cat, art, price) {
		this.category = cat;
		this.article = art;
		this.price = price;
	};

	function getNumm(arr) {
		const itNum = document.querySelector(".itemsNumber");
		itNum.innerHTML = arr.length;
	};

	function getSumm (arr) {
		const element = document.querySelector(".summ");
		let summ = 0;
		for (let i = 0; i < arr.length; i++){
			for(let key in arr[i]){
				if(key === "price"){
					let price = parseInt(arr[i][key]);
					summ += price;
				}
			}
		}
		element.innerHTML = summ;
	}

	function showArray(obj) {
		const bin = document.querySelector(".Bin");
		const buttonclear = document.querySelector(".buttonclear");
		const div = document.createElement("div");
					div.classList.add("binElement");

		for(let key in obj) {
			const elem = document.createElement("p");
						elem.innerHTML = obj[key];
						div.appendChild(elem);
		};
		bin.appendChild(div);
	};

	function deleteItem (elem, bin) {
		dataArray.pop();
		console.log(dataArray);
		bin.removeChild(elem);
		getNumm (dataArray);
		getSumm(dataArray);
	};

	window.deleteItem = deleteItem;
	window.binHandler = binHandler;
})();



const content = document.querySelector("body");
content.addEventListener("click",whereWasClick);

function whereWasClick () {
	const target = event.target
	const buttons = document.querySelectorAll(".button");
	if(target.className === "button"){

		const parent = target.closest(".shop-item");

		const article = parent.querySelector(".category").textContent;
		const subject = parent.querySelector(".article").textContent;
		const price = parent.querySelector(".price").textContent;
		binHandler(article, subject, price);

	}else if(target.className === "buttonclear") {
		const bin = target.closest(".Bin");
		const element = bin.querySelector(".binElement");
		deleteItem(element, bin);
	};
};




const cart = document.querySelector("header .cart"); 
cart.addEventListener("click",showBin);
function showBin() {
	const bin = document.querySelector(".Bin");
	bin.classList.contains("noDisplay") ? bin.classList.remove("noDisplay") : bin.classList.add("noDisplay");
};


