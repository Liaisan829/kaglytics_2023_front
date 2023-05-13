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
	tags: any[];
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

	save() {
		this.loadFilteredCompetitions();
	}

	ngOnInit(): void {
		this.loadAllCompetitions();

		this.getTags();
	}

	loadAllCompetitions() {
		this.competitionsService.getActiveCompetitions()
			.pipe(takeUntil(this.destroy$))
			.subscribe(competitions => {
				this.dataSource = new MatTableDataSource<any[]>(competitions);
				this.dataSource.sort = this.sort;
				this.cdr.markForCheck();
			});
	}

	getTags() {
		this.tags$
			.pipe(takeUntil(this.destroy$))
			.subscribe(tags => {
				this.tags = tags;
				this.filteredOptions = tags;
				this.cdr.markForCheck();
			});
	}

	resetForm() {
		this.form.reset();
		this.loadAllCompetitions();
	}

	getCompetitionTags(element: any) {
		return element.tags_dto.length > 0 ? element.tags_dto.map(tag => tag.name).join(', ') : 'no tags';
	}

	onInputChange(event: any) {
		const searchInput = event.target.value.toLowerCase();

		this.filteredOptions = this.tags.filter(({name}) => {
			const tags = name.toLowerCase();
			return tags.includes(searchInput);
		});
	}

	onOpenChange(searchInput: any) {
		searchInput.value = "";
		this.filteredOptions = this.tags;
	}

	loadFilteredCompetitions() {
		this.competitionsService.getFilteredCompetitions(this.form.value)
			.pipe(takeUntil(this.destroy$))
			.subscribe(response => {
				this.dataSource = response;
				console.log(response);
				this.cdr.markForCheck();
			});
	}
}
