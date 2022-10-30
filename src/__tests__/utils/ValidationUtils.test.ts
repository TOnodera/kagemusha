import { test, expect } from '@jest/globals';
import ValidationUtils from '../../utils/ValidationUtils';

test('対象時刻が範囲外にある場合はエラーにならない', () => {
  const result1 = ValidationUtils.checkRange('12:00', '14:00', '15:00');
  expect(result1).toBeTruthy();

  const result2 = ValidationUtils.checkRange('16:00', '14:00', '15:00');
  expect(result2).toBeTruthy();
});

test('対象時刻が範囲内にある場合エラーとなる', () => {
  const result1 = ValidationUtils.checkRange('14:30', '14:00', '15:00');
  expect(result1).toBeFalsy();

  const result2 = ValidationUtils.checkRange('14:00', '14:00', '15:00');
  expect(result2).toBeFalsy();

  const result3 = ValidationUtils.checkRange('14:00', '14:00', '15:00');
  expect(result3).toBeFalsy();

  const result4 = ValidationUtils.checkRange('14:00', '14:00', '15:00');
  expect(result4).toBeFalsy();
});
