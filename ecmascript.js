
;(function () {
	const dataArray = [];

	function binHandler(cat, art, price) {
		// у тебя в голове есть некий паттерн, который заставляет
		// тебя делать аналог функции main() в джаве
		// Это не обязательно, можно обойтись и без этого :)
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
		// Ты снова пытаешься работать с DOM из модуля.
		// Можно просто написать:
		// function getNumm(arr) {
		// 	return arr.length;
		// }
		const itNum = document.querySelector(".itemsNumber");
		itNum.innerHTML = arr.length;
	};

	function getSumm (arr) {
		// То же самое - можно просто сделать метод, который считает сумму
		// и возвращает это значение, а это самое значение уже рисовать
		// в остальном скрипте
		const element = document.querySelector(".summ");
		let summ = 0;
		// Тут ты делаешь полный перебор всех элементов массива и почти
		// полный перебор всех свойств каждого элемента массива
		// Всю эту конструкцию можно заменить одним методом
		// arr.reduce(..........)
		for (let i = 0; i < arr.length; i++){
			// вложенных циклов лучше избегать везде, где это возможно
			// тут - возможно
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
		// ну тут стандартно - можно рисовать корзинку за пределами модуля корзины
		// что если тебе в разных местах надо её рисовать по разному?
		// будешь плодить методы для каждого конкретного случая и сопровождать каждый?
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
		// а где ты видел такое удаление? :)))
		// Как правило ты хочешь удалить КОНКРЕТНЫЙ товар, верно?
		dataArray.pop();
		console.log(dataArray);
		bin.removeChild(elem);
		getNumm (dataArray);
		getSumm(dataArray);
	};

	// На самом деле лучше делать один единственный экспорт
	// Например объект: window.basket = {
	//	deleteItem: deleteItem,
	//	binHandler: binHandler
	// }
	window.deleteItem = deleteItem;
	window.binHandler = binHandler;
})();



const content = document.querySelector("body");
content.addEventListener("click",whereWasClick);

// Это ты прям врубил брутального мужика и перехватываешь просто все клики в боди
// Так делать не стоит, если у тебя пара десятков элементов по которым надо обрабатывать клики
// тебе придется раздуть эту функцию до совершенно нелегальных размеров...
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


