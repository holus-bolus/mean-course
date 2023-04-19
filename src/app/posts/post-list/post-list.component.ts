import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // postsArray = [
  //   { title: 'First post', content: "This is the first post's content" },
  //   { title: 'second post', content: "This is the second post's content" },
  //   { title: 'third post', content: "This is the third post's content" },
  // ];
  // @Input() postsArray: Post[] = [];
  postsArray: Post[] = [];
  private postsSubscription: Subscription | undefined;

  constructor(public postService: PostsService) {}

  ngOnInit() {
    this.postsArray = this.postService.getPosts();
    this.postsSubscription = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.postsArray = posts;
      });
  }

  ngOnDestroy() {
    this.postsSubscription?.unsubscribe();
  }
}
