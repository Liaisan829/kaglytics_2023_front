import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EChartsOption } from "echarts";
import { AnalyticsService } from "@services/analytics.service";
import { takeUntil } from "rxjs";
import { DestroyService } from "@services/destroy.service";
import { ToastService } from "@services/toast.service";

@Component({
	selector: 'app-analytics',
	templateUrl: './analytics.component.html',
	styleUrls: ['./analytics.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent implements OnInit {
	categories = [];
	organizations = [];
	rewardTypes = [];
	tags = [];

	categoriesOptions: EChartsOption;
	organizationOptions: EChartsOption;
	rewardTypesOptions: EChartsOption;
	tagsOptions: EChartsOption;

	loadCategories = true;
	loadOrganizations = true;
	loadRewardTypes = true;
	loadTags: boolean = true;

	constructor(
		private analyticsService: AnalyticsService,
		private destroy$: DestroyService,
		private cdr: ChangeDetectorRef,
		private toast: ToastService
	) {
		this.categoriesOptions = {};
		this.organizationOptions = {};
		this.rewardTypesOptions = {};
		this.tagsOptions = {};
	}

	ngOnInit() {
		this.analyticsService.getCategoriesStatistics()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (res) => {
					this.categories = Object.entries(res).map(([key, value]) => ({key, value}));
					this.cdr.markForCheck();
					this.categoriesChart();
				},
				error: () => {
					this.loadCategories = false;
					this.toast.error('An error has occured');
				},
				complete: () => {
					this.loadCategories = false;
				}
			});

		this.analyticsService.getOrganizationsStatistics()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (res) => {
					this.organizations = Object.entries(res).map(([key, value]) => ({key, value}));
					this.cdr.markForCheck();
					this.organizationsChart();
				},
				error: () => {
					this.loadOrganizations = false;
					this.toast.error('An error has occured');
				},
				complete: () => {
					this.loadOrganizations = false;
				}
			});

		this.analyticsService.getRewardTypesStatistics()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (res) => {
					this.rewardTypes = Object.entries(res).map(([key, value]) => ({key, value}));
					const nanReward = this.rewardTypes.find(reward => reward.key === 'nan');
					const index = this.rewardTypes.indexOf(nanReward);
					this.rewardTypes.splice(index, 1);
					this.rewardTypes.push({key: 'No reward', value: nanReward.value})
					this.cdr.markForCheck();
					this.rewardTypesChart();
				},
				error: () => {
					this.loadRewardTypes = false;
					this.toast.error('An error has occured');
				},
				complete: () => {
					this.loadRewardTypes = false;
				}
			});

		this.analyticsService.getTagsStatistics()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (res) => {
					this.tags = Object.entries(res).map(([key, value]) => ({key, value}));
					this.cdr.markForCheck();
					this.tagsChart();
				},
				error: () => {
					this.loadTags = false;
					this.toast.error('An error has occured');
				},
				complete: () => {
					this.loadTags = false;
				}
			});
	}


	categoriesChart() {
		this.categoriesOptions = {
			title: {
				text: 'Categories',
				left: 'left'
			},
			tooltip: {
				trigger: 'item'
			},
			series: [
				{
					type: 'pie',
					radius: '90%',
					data: [
						{value: this.categories[0].value, name: this.categories[0].key},
						{value: this.categories[1].value, name: this.categories[1].key},
						{value: this.categories[2].value, name: this.categories[2].key},
						{value: this.categories[3].value, name: this.categories[3].key},
						{value: this.categories[4].value, name: this.categories[4].key},
						{value: this.categories[5].value, name: this.categories[5].key},
						{value: this.categories[6].value, name: this.categories[6].key},
					],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		}
	};


	organizationsChart() {
		this.organizationOptions = {
			title: {
				text: 'Organizations',
				left: 'left'
			},
			tooltip: {
				trigger: 'item'
			},
			series: [
				{
					type: 'pie',
					radius: '90%',
					data: [
						{value: this.organizations[0].value, name: this.organizations[0].key},
						{value: this.organizations[1].value, name: this.organizations[1].key},
						{value: this.organizations[2].value, name: this.organizations[2].key},
						{value: this.organizations[3].value, name: this.organizations[3].key},
						{value: this.organizations[4].value, name: this.organizations[4].key},
						{value: this.organizations[5].value, name: this.organizations[5].key},
						{value: this.organizations[6].value, name: this.organizations[6].key},
						{value: this.organizations[7].value, name: this.organizations[7].key},
						{value: this.organizations[8].value, name: this.organizations[8].key},
						{value: this.organizations[9].value, name: this.organizations[9].key},
					],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
	}

	rewardTypesChart() {
		this.rewardTypesOptions = {
			title: {
				text: 'Reward Types',
				left: 'left'
			},
			tooltip: {
				trigger: 'item'
			},
			series: [
				{
					type: 'pie',
					radius: '90%',
					data: [
						{value: this.rewardTypes[0].value, name: this.rewardTypes[0].key},
						{value: this.rewardTypes[1].value, name: this.rewardTypes[1].key},
						{value: this.rewardTypes[2].value, name: this.rewardTypes[2].key},
						{value: this.rewardTypes[3].value, name: this.rewardTypes[3].key},
						{value: this.rewardTypes[4].value, name: this.rewardTypes[4].key},
						{value: this.rewardTypes[5].value, name: this.rewardTypes[5].key},
						{value: this.rewardTypes[6].value, name: this.rewardTypes[6].key},
						{value: this.rewardTypes[7].value, name: this.rewardTypes[7].key},
					],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
	}


	tagsChart() {
		this.tagsOptions = {
			title: {
				text: 'Tags',
				left: 'left'
			},
			tooltip: {
				trigger: 'item'
			},
			series: [
				{
					type: 'pie',
					radius: '90%',
					data: [
						{value: this.tags[0].value, name: this.tags[0].key},
						{value: this.tags[1].value, name: this.tags[1].key},
						{value: this.tags[2].value, name: this.tags[2].key},
						{value: this.tags[3].value, name: this.tags[3].key},
						{value: this.tags[4].value, name: this.tags[4].key},
						{value: this.tags[5].value, name: this.tags[5].key},
						{value: this.tags[6].value, name: this.tags[6].key},
						{value: this.tags[7].value, name: this.tags[7].key},
						{value: this.tags[8].value, name: this.tags[8].key},
						{value: this.tags[9].value, name: this.tags[9].key},
					],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		}
	}
}
