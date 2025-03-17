import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {
  chapters: any[] = [
    { "id": 1, "name": "one" },
    { "id": 2, "name": "two" },
    { "id": 3, "name": "three" },
    { "id": 4, "name": "four" }
  ]
  
  chapter=[]

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchChapters(); // Load chapters on component init
  }

  /**
   * Fetch the chapter list from the existing API
   */
  fetchChapters() {
    this.http.get<any[]>('/api/get-chapters').subscribe(
      (data) => {
        this.chapters = data.map((chapter, index) => ({
          ...chapter,
          order: index + 1 // Assign default order since API does not provide it
        }));
      },
      (error) => {
        console.error('Error fetching chapters:', error);
      }
    );
  }
  onDrop(event: CdkDragDrop<any[]>) {
    //re-arrange the chapter(not update orderId)
    moveItemInArray(this.chapters, event.previousIndex, event.currentIndex);

    // Update the order numbers after rearrangement
    this.chapters.forEach((chapter, index) => {
      chapter.order = index + 1;
    });

    // Call the new API to save the updated order
    this.saveOrder();
  }
    
  /**
   * Sends the updated order to the new API
   */
  saveOrder() {
    const payload = this.chapters.map((chapter) => ({
      id: chapter.id, // Required to identify the chapter
      order: chapter.order // New order value
    }));

    this.http.post('/api/update-order', payload).subscribe(
      (response) => {
        console.log('Order saved successfully:', response);
      },
      (error) => {
        console.error('Error saving order:', error);
      }
    );
  }
}
