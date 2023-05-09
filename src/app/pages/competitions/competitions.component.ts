import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CompetitionsService } from "@services/competitions.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { takeUntil } from "rxjs";
import { DestroyService } from "@services/destroy.service";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { LiveAnnouncer } from "@angular/cdk/a11y";

@Component({
	selector: 'app-competitions',
	templateUrl: './competitions.component.html',
	styleUrls: ['./competitions.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompetitionsComponent implements OnInit {
	@ViewChild(MatSort) sort: MatSort;
	form: FormGroup;
	tags$ = this.competitionsService.getTags();
	categories$ = this.competitionsService.getCategories();
	rewardTypes$ = this.competitionsService.getRewardTypes();
	dataSource: any;
	displayedColumns = ['title', 'description', 'tags', 'reward_type', 'category', 'prediction', 'deadline'];
	filteredOptions: any;

	constructor(
		private competitionsService: CompetitionsService,
		private fb: FormBuilder,
		private destroy$: DestroyService,
		private _liveAnnouncer: LiveAnnouncer,
		private cdr: ChangeDetectorRef
	) {
		this.buildForm();
	}

	private buildForm() {
		this.form = this.fb.group({
			title: [''],
			tags: [''],
			reward_type: [''],
			category: [''],
			deadline_before: [''],
			deadline_after: ['']
		});
	}

	ngOnInit(): void {
		this.competitionsService.getActiveCompetitions()
			.pipe(takeUntil(this.destroy$))
			.subscribe(competitions => {
				this.dataSource = new MatTableDataSource<any[]>(competitions);
				this.dataSource.sort = this.sort;
				this.cdr.markForCheck();
			})
	}

	announceSortChange(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
		} else {
			this._liveAnnouncer.announce(`Sorting cleared`);
		}
	}
}
