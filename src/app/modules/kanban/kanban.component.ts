import { Component, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  todo = [
    'https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg',
    'https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO4NEWEGmOTWVdnP5UbFsE5KDR78Gk0zcbGnKni0FGzNoLvIYe',
    'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13002253/GettyImages-521536928-_1_.jpg'
  ];
  doing = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQeT4k0aJUHM4b2IzMn5IhXWW8iNOv7G3AcLpF2y4dHGIr8lZFRw'
  ];
  done = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3u2EMCzjfRXpyeNF0gKU12cM-vbgk2OtMLSqQ5mJrdWc3D1WVmQ',
    'https://cdn.newsapi.com.au/image/v1/2ce7e67aaaa73f589a1155fe764f4dba?width=1024',
  ];
  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
