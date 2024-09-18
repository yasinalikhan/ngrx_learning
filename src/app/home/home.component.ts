import { Component, OnInit } from '@angular/core';
import { TreeNode } from '../commons/treeview/treeview.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: TreeNode[] = [
    {
      name: 'Root 1',
      children: [
        { name: 'Child 1' },
        { name: 'Child 2', children: [{ name: 'Grandchild 1' }, { name: 'Grandchild 2' }] },
      ],
    },
    {
      name: 'Root 2',
      children: [{ name: 'Child 3' }],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
