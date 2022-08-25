import {Component, OnDestroy, OnInit} from '@angular/core';
import {TextAnalyzerService} from '../../resources/textAnalyser.service';
import {TextAnalyserType} from '../../resources/AnalyzerType';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-text-analyser',
  templateUrl: './text-analyser.component.html',
  styleUrls: ['./text-analyser.component.css']
})
export class TextAnalyserComponent implements OnInit, OnDestroy {
  public textAnalyserType: TextAnalyserType = TextAnalyserType.VOWEL;
  public userInputText = '';
  public userOutput = [];
  public isOnline: boolean;
  private subscriptions: Subscription[] = [];
  constructor(private textAnalyserService: TextAnalyzerService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.textAnalyserService.analyseOutput.subscribe(
      response =>
        // so that the current output shows up in the top
        this.userOutput = [response, ...this.userOutput]
    )),
      this.textAnalyserService.connectivityStatus.subscribe(
        connectivity =>
          this.isOnline = connectivity
      );
  }
  public analyseText(): void {
    if (this.textAnalyserType && this.userInputText) {
      this.textAnalyserService.analyseText(this.textAnalyserType, this.userInputText);
    }
  }
  public clearText(): void {
    this.userInputText = null;
    this.userOutput = [];
  }

  public toggleConnectivity(): void {
    this.textAnalyserService.toggleConnectivity();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(
      sub => sub.unsubscribe()
    );
  }

}
