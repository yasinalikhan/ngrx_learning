import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';




export interface TreeNode {
  name: string;
  children?: TreeNode[];
}


@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss']
})
export class TreeviewComponent implements OnInit {
  @Input() treeData: TreeNode[] = [];
  expanded: boolean[] = [];

  toggle(index: number): void {
    this.expanded[index] = !this.expanded[index];
  }

  
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<TreeNode[]>): void {
    const draggedNode = event.item.data?.node;
    if (!draggedNode) {
      return;
    }

    const previousData = event.previousContainer.data;
    const currentData = event.container.data;

    // Guard clauses to prevent errors
    if (!previousData || !currentData) {
      return;
    }

    // Moving within the same container
    if (event.previousContainer === event.container) {
      if (previousData.length > 1) {
        moveItemInArray(previousData, event.previousIndex, event.currentIndex);
      }
    } else {
      // Remove from the previous list and add to the new list
      this.findAndRemoveNode(this.treeData, draggedNode);
      currentData.splice(event.currentIndex, 0, draggedNode);
    }

    // Trigger change detection to update the UI
    this.treeData = [...this.treeData];
    this.cdr.detectChanges();  // Force Angular to run change detection
    console.log('Updated Tree Data:', this.treeData);


   

  }
  findAndRemoveNode(tree: TreeNode[], node: TreeNode): boolean {
    const index = tree.indexOf(node);
    if (index > -1) {
      tree.splice(index, 1);
      return true;
    }
    for (let item of tree) {
      if (item.children && this.findAndRemoveNode(item.children, node)) {
        return true;
      }
    }
    return false;
  }


}
