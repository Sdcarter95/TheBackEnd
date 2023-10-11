"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inpVal = __importStar(require("../inputValidation"));
describe('rangeValid', () => {
    it('should return true for a valid string length within the specified range', () => {
        const input = 'TestString';
        const lowerBound = 5;
        const upperBound = 15;
        expect(inpVal.rangeValid(input, lowerBound, upperBound)).toBe(true);
    });
    it('should return false for an invalid string length below the specified range', () => {
        const input = 'Short';
        const lowerBound = 10;
        const upperBound = 20;
        expect(inpVal.rangeValid(input, lowerBound, upperBound)).toBe(false);
    });
    it('should return false for an invalid string length above the specified range', () => {
        const input = 'ThisStringIsWayTooLong';
        const lowerBound = 5;
        const upperBound = 15;
        expect(inpVal.rangeValid(input, lowerBound, upperBound)).toBe(false);
    });
    it('should return true for a valid number within the specified range', () => {
        const input = 42;
        const lowerBound = 10;
        const upperBound = 50;
        expect(inpVal.rangeValid(input, lowerBound, upperBound)).toBe(true);
    });
    it('should return false for an invalid number below the specified range', () => {
        const input = 5;
        const lowerBound = 10;
        const upperBound = 50;
        expect(inpVal.rangeValid(input, lowerBound, upperBound)).toBe(false);
    });
    it('should return false for an invalid number above the specified range', () => {
        const input = 75;
        const lowerBound = 10;
        const upperBound = 50;
        expect(inpVal.rangeValid(input, lowerBound, upperBound)).toBe(false);
    });
});
describe('lengthValid', () => {
    it('should return true for a string with length below the maximum', () => {
        const input = 'TestString';
        const maxLength = 10;
        expect(inpVal.lengthValid(input, maxLength)).toBe(true);
    });
    it('should return false for a string with length above the maximum', () => {
        const input = 'ThisStringIsWayTooLong';
        const maxLength = 10;
        expect(inpVal.lengthValid(input, maxLength)).toBe(false);
    });
    it('should return true for a string array with length below the maximum', () => {
        const input = ["This", "is", "valid"];
        const maxLength = 4;
        expect(inpVal.lengthValid(input, maxLength)).toBe(true);
    });
    it('should return false for a string array with length above the maximum', () => {
        const input = ["This", "is", "not", "valid"];
        const maxLength = 3;
        expect(inpVal.lengthValid(input, maxLength)).toBe(false);
    });
});
describe('dateValid', () => {
    it('should return true for a valid date string', () => {
        const validDate = '2023-12-31';
        expect(inpVal.dateValid(validDate)).toBe(true);
    });
    it('should return false for an invalid date string', () => {
        const invalidDate = 'InvalidDate';
        expect(inpVal.dateValid(invalidDate)).toBe(false);
    });
});
describe('dataTypeValid', () => {
    it('should return true for matching data types', () => {
        expect(inpVal.dataTypeValid(42, 'number')).toBe(true);
        expect(inpVal.dataTypeValid('3.14', 'float')).toBe(true);
    });
    it('should return false for non-matching data types', () => {
        expect(inpVal.dataTypeValid('text', 'number')).toBe(false);
        expect(inpVal.dataTypeValid('3.14', 'number')).toBe(false);
    });
});
describe('noBlacklistedItems', () => {
    it('should return true if there are no blacklisted items', () => {
        const input = 'Hello World';
        const blacklist = ['q', 'z'];
        expect(inpVal.noBlacklistedItems(input, blacklist)).toBe(true);
    });
    it('should return false if there are blacklisted items', () => {
        const input = 'Hello World';
        const blacklist = ['a', 'e', 'i', 'o', 'u'];
        expect(inpVal.noBlacklistedItems(input, blacklist)).toBe(false);
    });
});
describe('StringHasInt', () => {
    it('should return true if the string contains integers', () => {
        const input = 'This is 42 and 123';
        expect(inpVal.StringHasInt(input)).toBe(true);
    });
    it('should return false if the string does not contain integers', () => {
        const input = 'No numbers here';
        expect(inpVal.StringHasInt(input)).toBe(false);
    });
});
