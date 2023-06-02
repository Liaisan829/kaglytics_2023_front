import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CompetitionsService } from "@services/competitions.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { takeUntil } from "rxjs";
import { DestroyService } from "@services/destroy.service";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ToastService } from "@services/toast.service";

@Component({
	selector: 'app-competitions',
	templateUrl: './competitions.component.html',
	styleUrls: ['./competitions.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompetitionsComponent implements OnInit {
	@ViewChild(MatSort) sort: MatSort;
	form: FormGroup;
	categories$ = this.competitionsService.getCategories();
	tags: any[];
	rewardTypes: any[];
	dataSource: any;
	displayedColumns = ['title', 'description', 'tags', 'reward_type', 'category', 'deadline', 'prediction'];
	filteredOptions: any;
	initialValues = {};

	loading: boolean = true;

	constructor(
		private competitionsService: CompetitionsService,
		private fb: FormBuilder,
		private destroy$: DestroyService,
		private cdr: ChangeDetectorRef,
		private toast: ToastService
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

		this.initialValues = this.form.value;
	}

	save() {
		this.loadFilteredCompetitions();
	}

	ngOnInit(): void {
		this.loadAllCompetitions();

		this.getTags();

		this.getRewardTypes();
	}

	loadAllCompetitions() {
		this.competitionsService.getActiveCompetitions()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (competitions) => {
					this.dataSource = new MatTableDataSource<any[]>(competitions);
					this.dataSource.sort = this.sort;
					this.cdr.markForCheck();
				},
				error: () => {
					this.loading = false;
					this.cdr.markForCheck();
					this.toast.error('An error has occurred');
				}, complete: () => {
					this.loading = false;
					this.cdr.markForCheck();
				}
			});
	}

	getTags() {
		this.competitionsService.getTags()
			.pipe(takeUntil(this.destroy$))
			.subscribe(tags => {
				this.tags = tags;
				this.filteredOptions = tags;
				this.cdr.markForCheck();
			});
	}

	getRewardTypes() {
		this.competitionsService.getRewardTypes()
			.pipe(takeUntil(this.destroy$))
			.subscribe(rewards => {
				this.rewardTypes = rewards;
				const nanReward = this.rewardTypes.find(reward => reward.name === 'nan');
				const index = this.rewardTypes.indexOf(nanReward);
				this.rewardTypes.splice(index, 1);
				this.rewardTypes.push({name: 'No reward', id: nanReward.id})
				this.cdr.markForCheck();
			});
	}

	resetForm() {
		this.form.reset(this.initialValues);
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
		this.loading = true;
		let formatted_deadline_before = '';
		if (this.form.get('deadline_before').value) {
			const deadline_before = new Date(this.form.get('deadline_before').value);
			deadline_before.setDate(deadline_before.getDate() + 1);
			formatted_deadline_before = deadline_before.toISOString().slice(0, 10);
		}

		let formatted_deadline_after = '';
		if (this.form.get('deadline_after').value) {
			const deadline_after = new Date(this.form.get('deadline_after').value);
			deadline_after.setDate(deadline_after.getDate() + 1);
			formatted_deadline_after = deadline_after.toISOString().slice(0, 10);
		}

		this.competitionsService.getFilteredCompetitions({
			...this.form.value,
			deadline_before: formatted_deadline_before,
			deadline_after: formatted_deadline_after,
		})
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (response) => {
					this.dataSource = response;
					this.cdr.markForCheck();
				},
				error: () => {
					this.loading = false;
					this.toast.error('An error has occurred');
				}, complete: () => {
					this.loading = false;
				}
			});
	}
}
