import { TestBed } from '@angular/core/testing';

import { TextAnalyzerService } from './textAnalyser.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

let service: TextAnalyzerService;
let httpTestingController: HttpTestingController;

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service =  TestBed.get(TextAnalyzerService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  /**
   * Testing the offline methods.
   */
  it('offlineConsonantsAnalyser should return {b:1, c:2} for "bcc"'
    , () => {
    const result = service.offlineConsonantsAnalyser('bcc');
    const expectedResult = {b: 1, c: 2};
    expect(result).toEqual(expectedResult);
  });
  it('offlineConsonantsAnalyser should return {b:1, c:2, 0: 1} for "bcc0"'
    , () => {
      const result = service.offlineConsonantsAnalyser('bcc');
      const expectedResult = {b: 1, c: 2};
      expect(result).toEqual(expectedResult);
    });
  it('offlineConsonantsAnalyser should return {a:0, i:0, u:0, e:2, o:1} for "testVowels"'
    , () => {
      const result = service.offlineVowelAnalyser('testVowels');
      const expectedResult = {a: 0, i: 0, u: 0, e: 2, o: 1};
      expect(result).toEqual(expectedResult);
    });
  it('offlineConsonantsAnalyser should return {a:0, i:0, u:0, e:2, o:1} for "testVowels////058032"'
    , () => {
      const result = service.offlineVowelAnalyser('testVowels');
      const expectedResult = {a: 0, i: 0, u: 0, e: 2, o: 1};
      expect(result).toEqual(expectedResult);
    });
  /**
   * Testing for helper functions
   */
  it('isVowel should return true for aeiou'
    , () => {
      const a = service.isVowel('a');
      const e = service.isVowel('e');
      const o = service.isVowel('o');
      const i = service.isVowel('i');
      const u = service.isVowel('u');
      expect(a).toBe(true);
      expect(e).toBe(true);
      expect(i).toBe(true);
      expect(o).toBe(true);
      expect(u).toBe(true);
    });
  it('isVowel should return false for c/.-v'
    , () => {
      const c = service.isVowel('c');
      const sign1 = service.isVowel('/');
      const sign2 = service.isVowel('.');
      const sign3 = service.isVowel('-');
      const v = service.isVowel('v');
      expect(c).toBe(false);
      expect(sign1).toBe(false);
      expect(sign2).toBe(false);
      expect(sign3).toBe(false);
      expect(v).toBe(false);
    });
});
