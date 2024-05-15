import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string = '';
  user: any = null;
  repos: any[] = [];  
  error: string = ''; 

  constructor(private githubService: GithubService) {}

  onSearch() {
    if (this.username) {
      this.githubService.getUserDetails(this.username).subscribe({
        next: user => {
          this.user = user;
          this.error = '';
          this.githubService.getUserRepos(this.username).subscribe({
            next: repos => {
              this.repos = repos;
            },
            error: err => {
              console.error(err);
              this.error = 'Error fetching repositories';
            }
          });
        },
        error: err => {
          console.error(err);
          this.error = 'User not found';
          this.user = null;
          this.repos = [];
        }
      });
    }
  }
}





