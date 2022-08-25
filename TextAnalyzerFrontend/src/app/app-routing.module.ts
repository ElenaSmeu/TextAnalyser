import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TextAnalyserComponent} from './components/text-analyser/text-analyser.component';

const routes: Routes = [
  {path: '', redirectTo: '/text-analyser', pathMatch: 'full'},
  // redirect to text-analyser
  {path: 'text-analyser', component: TextAnalyserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
