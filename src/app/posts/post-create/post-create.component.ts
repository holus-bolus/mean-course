import { Component } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  newPost: string = 'NO CONTENT';
  enteredTitle: string = '';
  enteredContent: string = '';

  // @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Post = {
      // title: this.enteredTitle,
      // content: this.enteredContent,
      title: form.value.title,
      content: form.value.content,
    };
    // this.postCreated.emit(post);
    this.postsService.addPosts(form.value.title, form.value.content);
    form.resetForm();
  }
}
