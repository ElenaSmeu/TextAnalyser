import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TextAnalyserType} from './AnalyzerType';
@Injectable({
  providedIn: 'root',
})
export class TextAnalyzerService {

  private $analizeOutput: BehaviorSubject<string []> = new BehaviorSubject< string []>([]);
  private $connectivityStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(navigator.onLine);

  get analyseOutput(): Observable<string []> {
    return this.$analizeOutput.asObservable();
  }

  get connectivityStatus(): Observable<boolean> {
    return this.$connectivityStatus.asObservable();
  }


  constructor(private httpClient: HttpClient) {
  }

  public analyseText(textAnalyserType: TextAnalyserType, inputText: string): void {
    // We need to check if the browser is online or not;
    if (this.$connectivityStatus.value) {
      this.analyseTextOnline(textAnalyserType, inputText);
    } else {
      console.log('I am offline');
      this.analyseTextOffline(textAnalyserType, inputText);
    }
  }
  public toggleConnectivity(): void {
    this.$connectivityStatus.next(!this.$connectivityStatus.value);
  }

  /**
   * @description fetching the endpoint
   * @param textAnalyserType (can be VOWEL or CONSONANTS)
   * @param inputText (user text)
   */
  public analyseTextOnline(textAnalyserType: TextAnalyserType, inputText: string): void {
  const params = new HttpParams().set('type', textAnalyserType).set('text', inputText);
  this.httpClient.get('http://localhost:8080/textAnalyzer', {params})
    .subscribe( response => {
          this.$analizeOutput.next(this.fromResponseToOutput(response));
    }
    , error => {
        this.$analizeOutput.next(['There has been an issue,now running locally..']);
        this.analyseTextOffline(textAnalyserType, inputText);
      });
  }


  /**
   * @description This is fallBack for the application to work offline, with its on build-in scripts
   * @param textAnalyserType (can be VOWEL or CONSONANTS)
   * @param inputText (user text)
   */
  public analyseTextOffline(textAnalyserType: TextAnalyserType, inputText: string): void {
    if (textAnalyserType === TextAnalyserType.VOWEL) {
        this.$analizeOutput.next(this.fromResponseToOutput(this.offlineVowelAnalyser(inputText)));
      }
      else  if (textAnalyserType === TextAnalyserType.CONSONANTS){
        this.$analizeOutput.next(this.fromResponseToOutput(this.offlineConsonantsAnalyser(inputText)));
      }
  }

  /**
   * @description This is a vowel analyser for the input text, return an object with the vowel keys and a value of the count.
   * @param inputText (user text)
   */
  public offlineVowelAnalyser(inputText: string): any {
    const vowels = {
      a: 0,
      e: 0,
      i: 0,
      o: 0,
      u: 0
    }; // Initialization of the specific vowels Object
    inputText = inputText.toLowerCase(); // preprocessing of the input text
    for (const char of inputText) // loop through the text
    { // getTheVowel keys --> 'a', 'e', 'i', 'o', 'u'
      Object.keys(vowels).forEach(
        // If the key is the char then update the object else keep it.
        key => key === char ? vowels[char] = vowels[char] + 1 : vowels[char]
      );
    }
    return vowels;
  }

  /**
   * @description This is a consonants analyser of the text, it checks whether they are vowels or not
   * returns an dictionary with each found char key and the count value.
   * @param inputText (user text)
   */
  public offlineConsonantsAnalyser(inputText: string): any {
    let consonants: {[index: string]: number} = {}; // Declaration of a dictionary
    inputText = inputText.toLowerCase(); // preprocess the text to lowercase
    for (const char of inputText) { // loop through the text
      if (!this.isVowel(char)) { // check if its vowel
        const isKeyFound = Object.keys(consonants).includes(char); // check if the char is already in the dictionary
        if (isKeyFound) {
          consonants[char] = consonants[char] + 1; // update the specific value of the key-char
        } else {
          consonants = {...consonants, [char]: 1}; // add the char with the first find in the dictionary
        }
      }
    }
    return consonants;
  }
  /**
   * @description Mapping the object response: Obj: {k,v} to a human-readable form.
   * @param response (can came from the endpoint or build-in scripts )
   */
  public fromResponseToOutput(response): string[] {
    return Object.keys(response)
      .filter(key => response[key] > 0)
      .map( key => {
        return `Letter "${key}" appears ${response[key]} times`;
      });
  }
  /***
   * @description This is a helper function to define when a string/char is a en-vowel
   * @param letter (char from a string)
   */
  public isVowel(letter: string): boolean {
    return letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' || letter === 'u';
  }
}
