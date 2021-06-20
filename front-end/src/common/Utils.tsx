import React from "react";

/**
 * Verify text length
 * @param text
 * @param MaxLength
 * @returns true if length is lower
 */
export const verifyValueLength = (value: string, maxLength: number) => {
	if (value.length > maxLength) {
		return false;
	}
	return true;
};

/**
 * Verify if text is empty or has just spaces
 * @param text
 * @returns true if is empty
 */
 export const isEmpty = (value: string) => {
	if (!value || !value.replaceAll(" ", "")) {
		return true;
	}
	return false;
};