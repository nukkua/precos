export interface LaravelValidationError {
	[key: string]: string[];
}

export interface LaravelErrorResponse {
	success: boolean;
	error: LaravelValidationError 
}
