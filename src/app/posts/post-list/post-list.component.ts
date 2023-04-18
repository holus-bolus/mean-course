import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  // postsArray = [
  //   { title: 'First post', content: "This is the first post's content" },
  //   { title: 'second post', content: "This is the second post's content" },
  //   { title: 'third post', content: "This is the third post's content" },
  // ];
  postsArray: { title: string; content: string }[] = [];
}