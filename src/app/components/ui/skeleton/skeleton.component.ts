import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {
}
