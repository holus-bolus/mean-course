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
  isLoading: boolean = false;
  private postsSubscription: Subscription | undefined;

  constructor(public postService: PostsService) {}

  ngOnInit() {
    this.postService.getPosts();
    this.isLoading = true;
    this.postsSubscription = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.postsArray = posts;
      });
  }

  ngOnDestroy() {
    this.postsSubscription?.unsubscribe();
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
    this.postService.getPosts();
  }
}
