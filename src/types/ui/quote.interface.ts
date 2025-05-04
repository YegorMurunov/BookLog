export interface IQuote {
	quote: string;
	author: string;
}

export interface IQuoteProps extends IQuote {
	className?: string;
}
