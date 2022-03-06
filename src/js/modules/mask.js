const mask = (selector) => {

	let setCursorPosition = (pos, elem) => {
		elem.focus();

		if (elem.setSelectionRange) {
			elem.setSelectionRange(pos, pos);
		} else if (elem.createTextRange) {
			let range = elem.createTextRange();

			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	};

	function createMask(event) {
		let matrix = '+7 (___) ___ __ __',
			 i = 0,
			 def = matrix.replace(/\D/g, ''),  // удаление всех не цифр из матрицы
			 val = this.value.replace(/\D/g, '');

		if (def.length >= val.length) {
			val = def;    // не даём пользователю удалить семёрку и плюс
		}

		this.value = matrix.replace(/./g, function(a) { // перебираем все элементы в матрице и устанавливаем новый value
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
		});

		if (event.type === 'blur') { // очищаем value
			if (this.value.length == 2) {
				this.value = '';
			}
		} else { // устанавливаем cursor
			setCursorPosition(this.value.length, this);
		}
	}

	let inputs = document.querySelectorAll(selector);

	inputs.forEach(input => {
		input.addEventListener('input', createMask);
		input.addEventListener('focus', createMask);
		input.addEventListener('blur', createMask);
	});
};

export default mask;