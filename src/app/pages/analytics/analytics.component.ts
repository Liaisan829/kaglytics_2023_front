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
	categories = {};
	organizations = {};
	rewardTypes = {};
	tags = {};

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
				textStyle: {
					fontSize: 22
				}
			},
			legend: {
				show: false
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '5%',
				containLabel: true
			},
			tooltip: {},
			xAxis: [{
				type: 'category',
				data: [this.categories[0].key, this.categories[1].key, this.categories[2].key, this.categories[3].key, this.categories[4].key, this.categories[5].key, this.categories[6].key],
				axisTick: {
					alignWithLabel: true
				},
				axisLabel: {
					show: true,
					rotate: 45,
				},
			}],
			yAxis: {
				type: 'value',
			},
			series: [
				{
					type: 'bar',
					barWidth: 20,
					data: [this.categories[0].value, , , , , ,]
				},
				{
					type: 'bar',
					barWidth: 20,
					data: [, this.categories[1].value, , , , ,]
				},
				{
					type: 'bar',
					barWidth: 20,
					data: [, , this.categories[2].value, , , ,]
				},
				{
					type: 'bar',
					barWidth: 20,
					data: [, , , this.categories[3].value, , ,]
				},
				{
					type: 'bar',
					barWidth: 20,
					data: [, , , , this.categories[4].value, ,]
				},
				{
					type: 'bar',
					barWidth: 20,
					data: [, , , , , this.categories[5].value,]
				},
				{
					type: 'bar',
					barWidth: 20,
					data: [, , , , , , this.categories[6].value]
				}
			],
		}
	};

	organizationsChart() {
		this.organizationOptions = {
			title: {
				text: 'Organizations',
				textStyle: {
					fontSize: 22
				}
			},
			legend: {
				show: false
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '5%',
				containLabel: true
			},
			tooltip: {},
			xAxis: {
				type: 'category',
				data: [this.organizations[0].key, this.organizations[1].key, this.organizations[2].key, this.organizations[3].key, this.organizations[4].key, this.organizations[5].key, this.organizations[6].key, this.organizations[7].key, this.organizations[8].key, this.organizations[9].key],
				axisTick: {
					alignWithLabel: true
				},
				axisLabel: {
					show: true,
					rotate: 45,
				},
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{type: 'bar', barWidth: 30, data: [this.organizations[0].value, , , , , , , , ,]},
				{type: 'bar', barWidth: 30, data: [, this.organizations[1].value, , , , , , , ,]},
				{type: 'bar', barWidth: 30, data: [, , this.organizations[2].value, , , , , , ,]},
				{type: 'bar', barWidth: 30, data: [, , , this.organizations[3].value, , , , , ,]},
				{type: 'bar', barWidth: 30, data: [, , , , this.organizations[4].value, , , , ,]},
				{type: 'bar', barWidth: 30, data: [, , , , , this.organizations[5].value, , , ,]},
				{type: 'bar', barWidth: 30, data: [, , , , , , this.organizations[6].value, , ,]},
				{type: 'bar', barWidth: 30, data: [, , , , , , , this.organizations[7].value, ,]},
				{type: 'bar', barWidth: 30, data: [, , , , , , , , this.organizations[8].value,]},
				{type: 'bar', barWidth: 30, data: [, , , , , , , , , this.organizations[9].value]}
			],
		};
	}

	rewardTypesChart() {
		this.rewardTypesOptions = {
			title: {
				text: 'Reward types',
				textStyle: {
					fontSize: 22
				}
			},
			legend: {
				show: false
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '5%',
				containLabel: true
			},
			tooltip: {},
			xAxis: {
				type: 'category',
				data: [this.rewardTypes[0].key, this.rewardTypes[1].key, this.rewardTypes[2].key, this.rewardTypes[3].key, this.rewardTypes[4].key, this.rewardTypes[5].key, this.rewardTypes[6].key, this.rewardTypes[7].key],
				axisTick: {
					alignWithLabel: true
				},
				axisLabel: {
					show: true,
					rotate: 45,
				},
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{type: 'bar', barWidth: 30, data: [this.rewardTypes[0].value, , , , , , ,]},
				{type: 'bar', barWidth: 30, data: [, this.rewardTypes[1].value, , , , , ,]},
				{type: 'bar', barWidth: 30, data: [, , this.rewardTypes[2].value, , , , ,]},
				{type: 'bar', barWidth: 30, data: [, , , this.rewardTypes[3].value, , , ,]},
				{type: 'bar', barWidth: 30, data: [, , , , this.rewardTypes[4].value, , ,]},
				{type: 'bar', barWidth: 30, data: [, , , , , this.rewardTypes[5].value, ,]},
				{type: 'bar', barWidth: 30, data: [, , , , , , this.rewardTypes[6].value,]},
				{type: 'bar', barWidth: 30, data: [, , , , , , , this.rewardTypes[7].value]},
			],
		};
	}

	tagsChart() {
		this.tagsOptions = {
			title: {
				text: 'Tags',
				textStyle: {
					fontSize: 22
				}
			},
			legend: {
				show: false
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '5%',
				containLabel: true
			},
			tooltip: {},
			xAxis: {
				type: 'category',
				data: [this.tags[0].key, this.tags[1].key, this.tags[2].key, this.tags[3].key, this.tags[4].key, this.tags[5].key, this.tags[6].key, this.tags[7].key, this.tags[8].key, this.tags[9].key],
				axisLabel: {
					show: true,
					rotate: 45,
				},
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{type: 'bar', barWidth: 30, data: [this.tags[0].value, , , , , , , , ,]},
				{type: 'bar', barWidth: 30, data: [, this.tags[1].value, , , , , , , ,]},
				{type: 'bar', barWidth: 30, data: [, , this.tags[2].value, , , , , , ,]},
				{type: 'bar', barWidth: 30, data: [, , , this.tags[3].value, , , , , ,]},
				{type: 'bar', barWidth: 30, data: [, , , , this.tags[4].value, , , , ,]},
				{type: 'bar', barWidth: 30, data: [, , , , , this.tags[5].value, , , ,]},
				{type: 'bar', barWidth: 30, data: [, , , , , , this.tags[6].value, , ,]},
				{type: 'bar', barWidth: 30, data: [, , , , , , , this.tags[7].value, ,]},
				{type: 'bar', barWidth: 30, data: [, , , , , , , , this.tags[8].value,]},
				{type: 'bar', barWidth: 30, data: [, , , , , , , , , this.tags[9].value]}
			],
		}
	}
}
