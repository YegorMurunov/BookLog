import type { IQuote } from '@/types/ui/quote.interface';

const getQuote = (percent: number): IQuote => {
	if (percent >= 100) {
		return {
			quote: 'Лучший путь к успеху это влюбиться в то, что ты делаешь',
			author: 'Джеки Чан'
		};
	}
	if (percent >= 70) {
		return {
			quote: 'Успех — это движение от неудачи к неудаче без потери энтузиазма',
			author: 'Уинстон Черчилль'
		};
	}
	if (percent >= 50) {
		return {
			quote:
				'Стоит только поверить, что вы можете — и вы уже на полпути к цели',
			author: 'Теодор Рузвельт'
		};
	}
	if (percent >= 30) {
		return {
			quote:
				'Неважно, как медленно ты продвигаешься, главное, что ты не останавливаешься',
			author: 'Брюс Ли'
		};
	}
	if (percent === 0) {
		return {
			quote: 'В любом деле самое главное — начать',
			author: 'Гай Кавасаки'
		};
	}

	// default value and for percent < 30 && percent > 0
	return {
		quote: 'Сделай шаг, и дорога появится сама собой',
		author: 'Стив Джобс'
	};
};

export default getQuote;
