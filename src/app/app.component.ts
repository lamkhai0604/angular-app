import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: any;
  newMemberName = '';
  members: string[] = [];
  errorMessage: string = "";
  numOfTeams: number | "" = "";
  teams: string[][] = [];

  onInput(val: string) {
    this.newMemberName = val;
  }

  addMember() {
    if (!this.newMemberName) {
      this.errorMessage = "Name cannot be empty"
      return;
    } else { this.errorMessage = "" }
    this.members.push(this.newMemberName);
    this.newMemberName = "";
  }

  onNumOfTeamsInput(val: string) {
    this.numOfTeams = +val
  }

  generateTeam() {
    if (!this.numOfTeams || this.numOfTeams <= 0) {
      this.errorMessage = "Invalid number of teams";
      return
    };

    if (this.members.length < this.numOfTeams) {
      this.errorMessage = "Not enough members"; 
      return;
    }

    this.errorMessage = "";
    const allMembers = [...this.members]

    while (allMembers.length) {
      for (let i = 0; i < this.numOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length)
        const member = allMembers.splice(randomIndex, 1)[0];
        if (!member) break;
        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member]
        }
      }
    }

    this.members = [];
    this.numOfTeams = "";
  }
}
