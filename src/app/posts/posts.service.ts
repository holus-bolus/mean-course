import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    // return [...this.posts];
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map(
            (post: { _id: any; title: any; content: any }) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
              };
            }
          );
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        // console.log(responseData.message);
        const postId = responseData.postId;
        post.id = postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  getSinglePost(id: string) {
    // return { ...this.posts.find((post) => post.id === id) };
    return this.http.get<{ _id: any; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {
      id: id,
      title: title,
      content: content,
    };
    this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      // .subscribe((response) => console.log(response));
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(
          (postItem) => postItem.id === post.id
        );
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postID: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postID)
      .subscribe(() => {
        // console.log('Deleted');
        const updatedPosts = this.posts.filter((postID) => {
          return postID !== postID;
        });
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
