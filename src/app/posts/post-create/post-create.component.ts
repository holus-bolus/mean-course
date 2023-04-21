import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  newPost: string = 'NO CONTENT';
  enteredTitle: string = '';
  enteredContent: string = '';
  private mode: string = 'create';
  private postId: any;
  post: Post | any;
  isLoading = false;

  // @Output() postCreated = new EventEmitter<Post>();

  constructor(
    public postsService: PostsService,
    public activatedRoute: ActivatedRoute
  ) {}

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    // const post: Post = {
    //   // title: this.enteredTitle,
    //   // content: this.enteredContent,
    //   title: form.value.title,
    //   content: form.value.content,
    // };
    // this.postCreated.emit(post);
    if (this.mode === 'create') {
      this.postsService.addPosts(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }

    form.resetForm();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.isLoading = true;
        this.postsService.getSinglePost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
        this.isLoading = false;
        // this.post = this.postsService.getSinglePost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
}
