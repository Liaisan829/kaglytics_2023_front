import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CompetitionsService } from "@services/competitions.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { takeUntil } from "rxjs";
import { DestroyService } from "@services/destroy.service";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

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
	displayedColumns = ['title', 'description', 'tags', 'reward_type', 'category', 'deadline', 'prediction'];
	filteredOptions: any;

	constructor(
		private competitionsService: CompetitionsService,
		private fb: FormBuilder,
		private destroy$: DestroyService,
		private cdr: ChangeDetectorRef
	) {
		this.buildForm();
	}

	private buildForm() {
		this.form = this.fb.group({
			title: [''],
			tags: [[]],
			reward_types: [[]],
			categories: [[]],
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
			});

		this.tags$
			.pipe(takeUntil(this.destroy$))
			.subscribe(tags => {
				this.filteredOptions = tags;
			});
	}

	resetForm() {
		this.form.reset();
	}

	getCompetitionTags(element: any) {
		return element.tags_dto.length > 0 ? element.tags_dto.map(tag => tag.name).join(', ') : 'no tags';
	}

	onInputChange(event: any) {
		const searchInput = event.target.value.toLowerCase();

		this.tags$.pipe(takeUntil(this.destroy$)).subscribe(tags => {
			// здесь баг
			tags.filter(tag => {
				const result = tag.name.toLowerCase();
				this.filteredOptions = result.includes(searchInput);
			});
		});
	}

	onOpenChange(searchInput: any) {
		searchInput.value = "";
		this.tags$
			.pipe(takeUntil(this.destroy$))
			.subscribe(tags => {
				this.filteredOptions = tags;
			});
	}
}
