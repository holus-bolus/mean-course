import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  isLoading = false;
  imagePreview: any;

  // @Output() postCreated = new EventEmitter<Post>();
  constructor(
    public postsService: PostsService,
    public activatedRoute: ActivatedRoute
  ) {}

  onSavePost() {
    if (this.form.invalid) {
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
      this.postsService.addPosts(
        this.form.value.title,
        this.form.value.content
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }

    this.form.reset();
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] }),
    });
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
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
        this.isLoading = false;
        // this.post = this.postsService.getSinglePost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file: any = (event.target as HTMLInputElement).files;
    this.form.patchValue({ image: file as Blob });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
