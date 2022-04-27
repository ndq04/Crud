import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete ?')) {
      this.postService.delete(id).subscribe((res: any) => {
        console.log('Post deleted successfully!');
        this.posts = this.posts.filter((item) => item.id !== id);
      });
    }
  }
}
