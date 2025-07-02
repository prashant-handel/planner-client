import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: false,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  @Input() config = {
    height: '1rem',
    width: '1rem',
    color: '#845EC2',
    name: 'A'
  };

  firstLetter: string = "A";

  ngOnInit() {
    this.firstLetter = this.config?.name?.charAt(0)?.toUpperCase();
  }

}
