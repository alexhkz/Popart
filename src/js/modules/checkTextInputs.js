const checkTextInputs = (selector) => {
	const txtInputs = document.querySelectorAll(selector);
	
	txtInputs.forEach(input => { // делаем, чтобы можно было вводить только кириллицу и цифры
		let value = input.value; // и делаем защиту от автозаполнения
		input.addEventListener('input', (e) => {
			if (input.value.match(/[^а-яё 0-9]/ig)) {
				e.preventDefault();
				input.value = value;
			} else {
				value = input.value;
			}
		});
	});
};

export default checkTextInputs;