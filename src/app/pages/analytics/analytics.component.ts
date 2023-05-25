import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EChartsOption } from "echarts";
import { AnalyticsService } from "@services/analytics.service";
import { takeUntil } from "rxjs";
import { DestroyService } from "@services/destroy.service";

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

	constructor(
		private analyticsService: AnalyticsService,
		private destroy$: DestroyService,
		private cdr: ChangeDetectorRef
	) {
		this.categoriesOptions = {};
		this.organizationOptions = {};
		this.rewardTypesOptions = {};
		this.tagsOptions = {};
	}

	ngOnInit() {
		this.analyticsService.getCategoriesStatistics()
			.pipe(takeUntil(this.destroy$))
			.subscribe(res => {
				this.categories = Object.entries(res).map(([key, value]) => ({key, value}));
				this.cdr.markForCheck();
				this.categoriesChart();
			});

		this.analyticsService.getOrganizationsStatistics()
			.pipe(takeUntil(this.destroy$))
			.subscribe(res => {
				this.organizations = Object.entries(res).map(([key, value]) => ({key, value}));
				this.cdr.markForCheck();
				this.organizationsChart();
			});

		// this.analyticsService.getRewardTypesStatistics()
		//   .pipe(takeUntil(this.destroy$))
		//   .subscribe(res => {
		//     console.log(res);
		//   });

		this.analyticsService.getTagsStatistics()
			.pipe(takeUntil(this.destroy$))
			.subscribe(res => {
				this.tags = Object.entries(res).map(([key, value]) => ({key, value}));
				this.cdr.markForCheck();
				this.tagsChart();
			});
	}

	categoriesChart() {
		this.categoriesOptions = {
			legend: {
				show: false
			},
			tooltip: {},
			xAxis: {
				type: 'category',
				data: [this.categories[0].key, this.categories[1].key, this.categories[2].key, this.categories[3].key, this.categories[4].key, this.categories[5].key, this.categories[6].key],
				axisLabel: {
					fontSize: 14,
					color: '#000',
					fontWeight: 'normal'
				}
			},
			// Declare a y-axis (value axis).
			yAxis: {
				type: 'value',
				// max: 500,
			},
			// Declare several 'bar' series,
			// every series will auto-map to each column by default.
			series: [
				{type: 'bar', data: [this.categories[0].value, , , , , ,]},
				{type: 'bar', data: [, this.categories[1].value, , , , ,]},
				{type: 'bar', data: [, , this.categories[2].value, , , ,]},
				{type: 'bar', data: [, , , this.categories[3].value, , ,]},
				{type: 'bar', data: [, , , , this.categories[4].value, ,]},
				{type: 'bar', data: [, , , , , this.categories[5].value,]},
				{type: 'bar', data: [, , , , , , this.categories[6].value]}
			],
		}
	};

	organizationsChart() {
		this.organizationOptions = {
			legend: {
				show: false
			},
			tooltip: {},
			xAxis: {
				type: 'category',
				data: [this.organizations[0].key, this.organizations[1].key, this.organizations[2].key, this.organizations[3].key, this.organizations[4].key, this.organizations[5].key, this.organizations[6].key, this.organizations[7].key, this.organizations[8].key, this.organizations[9].key],
				axisLabel: {
					fontSize: 14,
					color: '#000',
					fontWeight: 'normal'
				}
			},
			// Declare a y-axis (value axis).
			yAxis: {
				type: 'value',
				// max: 500,
			},
			// Declare several 'bar' series,
			// every series will auto-map to each column by default.
			series: [
				{type: 'bar', data: [this.organizations[0].value, , , , , , , , ,]},
				{type: 'bar', data: [, this.organizations[1].value, , , , , , , ,]},
				{type: 'bar', data: [, , this.organizations[2].value, , , , , , ,]},
				{type: 'bar', data: [, , , this.organizations[3].value, , , , , ,]},
				{type: 'bar', data: [, , , , this.organizations[4].value, , , , ,]},
				{type: 'bar', data: [, , , , , this.organizations[5].value, , , ,]},
				{type: 'bar', data: [, , , , , , this.organizations[6].value, , ,]},
				{type: 'bar', data: [, , , , , , , this.organizations[7].value, ,]},
				{type: 'bar', data: [, , , , , , , , this.organizations[8].value,]},
				{type: 'bar', data: [, , , , , , , , , this.organizations[9].value]}
			],
		};
	}

	tagsChart() {
		this.tagsOptions = {
			legend: {
				show: false
			},
			tooltip: {},
			xAxis: {
				type: 'category',
				data: [this.tags[0].key, this.tags[1].key, this.tags[2].key, this.tags[3].key, this.tags[4].key, this.tags[5].key, this.tags[6].key, this.tags[7].key, this.tags[8].key, this.tags[9].key],
				axisLabel: {
					fontSize: 14,
					color: '#000',
					fontWeight: 'normal'
				}
			},
			// Declare a y-axis (value axis).
			yAxis: {
				type: 'value',
				// max: 500,
			},
			// Declare several 'bar' series,
			// every series will auto-map to each column by default.
			series: [
				{type: 'bar', data: [this.tags[0].value, , , , , , , , ,]},
				{type: 'bar', data: [, this.tags[1].value, , , , , , , ,]},
				{type: 'bar', data: [, , this.tags[2].value, , , , , , ,]},
				{type: 'bar', data: [, , , this.tags[3].value, , , , , ,]},
				{type: 'bar', data: [, , , , this.tags[4].value, , , , ,]},
				{type: 'bar', data: [, , , , , this.tags[5].value, , , ,]},
				{type: 'bar', data: [, , , , , , this.tags[6].value, , ,]},
				{type: 'bar', data: [, , , , , , , this.tags[7].value, ,]},
				{type: 'bar', data: [, , , , , , , , this.tags[8].value,]},
				{type: 'bar', data: [, , , , , , , , , this.tags[9].value]}
			],
		}
	}
}
